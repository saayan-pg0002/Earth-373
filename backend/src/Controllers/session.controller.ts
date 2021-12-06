import { Request, Response } from "express";
import { AxiosResponse } from "axios";
import mongoose from "mongoose";
import { sendViewsRequests, errorHandler, http } from "../util";
import Session from "../Models/session.model";
import Association from "../Models/association.model";
import Mentee from "../Models/mentee.model";
import User from "../Models/user.model";

export const getVenues = async (req: Request, res: Response) => {
  try {
    const url: string =
      "https://app.viewsapp.net/api/restful/work/venues/search";
    const ViewsData: AxiosResponse<never> | any = await sendViewsRequests(
      url,
      http.get,
      undefined
    );

    const responseData: any = ViewsData?.data;
    const responseDataObjectKeys: string[] = Object.keys(responseData);
    const data: any = responseData[responseDataObjectKeys[0]];
    const venues: { venue_id: string; name: string }[] = [];

    for (const venue in data) {
      if (!data[venue]?.ArchivedBy) {
        venues.push({
          venue_id: data[venue]?.VenueID,
          name: data[venue]?.Name
        });
      }
    }

    return res.json({ venues });
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getVenues", error: errorHandler(error) });
  }
};

export const getSessionGroups = async (req: Request, res: Response) => {
  try {
    const url: string =
      "https://app.viewsapp.net/api/restful/work/sessiongroups/search";
    const ViewsData: AxiosResponse<never> | any = await sendViewsRequests(
      url,
      http.get,
      undefined
    );

    const responseData: any = ViewsData?.data;
    const responseDataObjectKeys: string[] = Object.keys(responseData);
    const data: any = responseData[responseDataObjectKeys[0]];
    const sessionGroups: {
      session_group_id: string;
      name: string;
      venue_id: string;
      lead_staff: string;
    }[] = [];

    for (const sessionGroup in data) {
      const {
        SessionGroupID = "",
        Title = "",
        VenueID = "",
        LeadStaff = ""
      } = data[sessionGroup];
      sessionGroups.push({
        session_group_id: SessionGroupID,
        name: Title,
        venue_id: VenueID,
        lead_staff: LeadStaff
      });
    }

    return res.json({ session_groups: sessionGroups });
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getSessionGroups", error: errorHandler(error) });
  }
};

export const getAssociatedSessions = async (req: Request, res: Response) => {
  try {
    const associationID: string = req.params.associationID;
    const sessions: AxiosResponse<never> | any = await Session.find(
      {
        association_id: associationID
      },
      "_id notes start_time end_time"
    ).exec();
    return res.json(sessions);
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getAssociatedSessions", error: errorHandler(error) });
  }
};

export const getSessionByID = async (req: Request, res: Response) => {
  try {
    const session_mongo_id: string = req.params.sessionID;
    const session: AxiosResponse<never> | any = await Session.findById(
      session_mongo_id,
      "_id notes start_time end_time is_cancelled association_id"
    ).exec();
    if (!session) return res.status(400).json({ error: "Session not found" });

    const association: AxiosResponse<never> | any = await Association.findById(
      session.association_id
    ).exec();
    if (!association)
      return res
        .status(400)
        .json({ error: "Association not found for this session " });

    const mentee: AxiosResponse<never> | any = await Mentee.findById(
      association.mentee_id,
      "first_name last_name"
    );
    if (!mentee)
      return res
        .status(400)
        .json({ error: "Mentee not found for this session" });

    return res.json({
      ...session.toJSON(),
      name: `${mentee.first_name} ${mentee.last_name}`
    });
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getSessionByID", error: errorHandler(error) });
  }
};

export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions: AxiosResponse<never> | any = await Session.find().exec();
    return res.json(sessions);
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getAllSessions", error: errorHandler(error) });
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const groupID: string = req.params.groupID;
    const associationID: string = req.params.associationID;
    const association: AxiosResponse<never> | any = await Association.findById(
      associationID
    ).exec();
    if (!association) return res.json({ error: "association not found" });

    const mentor = await User.findById(association.mentor_id).exec();
    const mentee = await Mentee.findById(association.mentee_id).exec();
    if (!mentor || !mentee)
      return res.json({ error: "mentor or mentee not found" });

    let url = `https://app.viewsapp.net/api/restful/work/sessiongroups/${groupID}/sessions`;
    const body: {
      Name: string;
      StartDate: string;
      StartTime: string;
      Duration: string;
      Activity: string;
      LeadStaff: string;
      VenueID: string;
      Cancelled: boolean;
    } = req.body;

    if (
      !body.StartDate ||
      !body.StartTime ||
      !body.VenueID ||
      !body.Duration ||
      !body.LeadStaff
    ) {
      return res.status(400).json({ error: "Some fields are not filled" });
    }

    const schedule: any = createSchedule(
      body.StartDate,
      body.StartTime,
      body.Duration
    );

    let ViewsData: AxiosResponse<never> | any;
    ViewsData = await sendViewsRequests(url, http.post, {
      ...body,
      Cancelled: body.Cancelled ? "1" : "0"
    });
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);

    const session_views_id: string = ViewsData.data.SessionID;
    const session_views_group_id: string = ViewsData.data.SessionGroupID;

    url =
      "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
      session_views_id;

    ViewsData = await sendViewsRequests((url += "/staff"), http.put, {
      ContactID: mentor.views_id
    });
    ViewsData = await sendViewsRequests((url += "/participants"), http.put, {
      ContactID: mentee.views_id
    });
    // no error checking because the Views' request will return
    // an error even though their API works

    const newSession = new Session({
      _id: new mongoose.Types.ObjectId(),
      views_id: session_views_id,
      views_group_id: session_views_group_id,
      association_id: associationID,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      is_cancelled: body.Cancelled
    });

    newSession.save();

    return res.json({ session_id: newSession._id });
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "createSessions", error: errorHandler(error) });
  }
};

export const updateSessions = async (req: Request, res: Response) => {
  try {
    const session_mongo_id: string = req.params.sessionID;
    const session: any = await Session.findById(session_mongo_id).exec();
    if (!session) return res.json({ error: "Session cannot be found" });

    let url =
      "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
      session.views_id;
    var body: {
      Name: string;
      SessionGroupID: string;
      StartDate: string;
      StartTime: string;
      Duration: string;
      LeadStaff: string;
      Cancelled: string;
      Activity: string;
      VenueID: string;
    } = req.body;

    if (
      !body.StartDate ||
      !body.StartTime ||
      !body.Duration ||
      !body.LeadStaff ||
      !body.VenueID
    )
      return res.status(400).json({ error: "Some fields are not filled" });

    body.SessionGroupID = session.views_group_id as string;

    const schedule: any = createSchedule(
      body.StartDate,
      body.StartTime,
      body.Duration
    );

    const updates: object = {
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      is_cancelled: body.Cancelled
    };

    await Session.findOneAndUpdate({ _id: session_mongo_id }, updates).exec();

    const ViewsData: AxiosResponse<never> | any = await sendViewsRequests(
      url,
      http.put,
      body
    );
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);

    return res.json({
      updated: `${session.views_id}`
    });
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "updateSessions", error: errorHandler(error) });
  }
};

const createSchedule = (
  startDate: string,
  startTime: string,
  duration: string
): object => {
  const start_time = new Date(startDate + "Z" + startTime);
  const time = duration.split(":");
  const seconds = +time[0] * 60 * 60 + +time[1] * 60;
  const end_time = new Date(start_time.getTime() + seconds * 1000);
  return { start_time, end_time };
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const session_mongo_id: string = req.params.sessionID as string;
    const session: any = await Session.findById(session_mongo_id).exec();
    return res.json(session.notes);
  } catch (error) {
    return res
      .status(400)
      .json({ function: "getNotes", error: errorHandler(error) });
  }
};

export const createNotes = async (req: Request, res: Response) => {
  try {
    const session_mongo_id: string = req.params.sessionID as string;
    const session = await Session.findById(session_mongo_id).exec();
    if (!session) return res.json({ error: "session not found" });

    const url: string =
      "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
      session.views_id +
      "/notes";

    var body: {
      Note: string;
      Private: string;
    } = req.body;

    if (!body.Note)
      return res.status(400).json({ error: "Note field must have values" });

    let ViewsData: AxiosResponse<never> | any;
    ViewsData = await sendViewsRequests(url, http.post, body);
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);

    await Session.findByIdAndUpdate(session_mongo_id, {
      $set: {
        notes: {
          views_id: ViewsData.data.NoteID,
          description: body.Note
        }
      }
    }).exec();

    return res.json({ note_id: `${ViewsData.data.NoteID}` });
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "createNotes", error: errorHandler(error) });
  }
};

export const updateNotes = async (req: Request, res: Response) => {
  try {
    const session_mongo_id: string = req.params.sessionID as string;

    const session: any = await Session.findById(session_mongo_id).exec();
    if (!session) return res.status(400).json({ error: "session not found" });

    const note_views_id = session.notes.views_id as string;

    let url: string =
      "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
      session.views_id +
      "/notes/" +
      note_views_id;

    var body: {
      Note: String;
    } = req.body;

    if (!body.Note)
      return res.status(400).json({ error: "Note field must have values" });

    const ViewsData: AxiosResponse<never> | any = await sendViewsRequests(
      url,
      http.put,
      body
    );
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);

    await Session.findByIdAndUpdate(session_mongo_id, {
      $set: {
        "notes.description": body.Note
      }
    }).exec();

    return res.json({ updated: `${note_views_id}` });
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "updateNotes", error: errorHandler(error) });
  }
};
