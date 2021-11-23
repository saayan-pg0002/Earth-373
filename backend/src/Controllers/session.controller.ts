import { Request, Response } from "express";
import mongoose from "mongoose";
import { sendViewsRequests, errorHandler, http } from "../util";
import Session from "../Models/session.model";
import Association from "../Models/association.model";
import Mentee from "../Models/mentee.model";
import User from "../Models/user.model";

export const getAssociatedSessions = async (req: Request, res: Response) => {
  const associationID: string = req.params.associationID;
  const sessions = await Session.find({ association_id: associationID }).exec();
  return res.json(sessions);
};

export const getSessionByID = async (req: Request, res: Response) => {
  const session_mongo_id = req.params.sessionID;
  const session = await Session.findById(session_mongo_id).exec();
  if (!session) return res.status(400).json({ error: "session not found" });
  return res.json(session);
};

export const getAllSessions = async (req: Request, res: Response) => {
  const sessions = await Session.find().exec();
  return res.json(sessions);
};

export const createSession = async (req: Request, res: Response) => {
  const groupID: string = req.params.groupID;
  const associationID: string = req.params.associationID;
  const association = await Association.findById(associationID).exec();
  if (!association) return res.json({ error: "association not found" });

  const mentor = await User.findById(association.mentor_id).exec();
  const mentee = await Mentee.findById(association.mentee_id).exec();
  if (!mentor || !mentee)
    return res.json({ error: "mentor or mentee not found" });

  let url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/" +
    groupID +
    "/sessions";
  var body: {
    Name: string;
    StartDate: string;
    StartTime: string;
    Duration: string;
    Activity: string;
    LeadStaff: string;
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

  let ViewsData: any;
  try {
    ViewsData = await sendViewsRequests(url, http.post, body);
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "createSessions", error: errorHandler(error) });
  }

  const session_views_id: string = ViewsData.data.SessionID;
  const session_views_group_id: string = ViewsData.data.SessionGroupID;

  url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    session_views_id;

  try {
    ViewsData = await sendViewsRequests((url += "/staff"), http.put, {
      ContactID: mentor.views_id,
    });
    ViewsData = await sendViewsRequests((url += "/participants"), http.put, {
      ContactID: mentee.views_id,
    });
    // no error checking because the Views' request will return
    // an error even though their API works
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "createSessions", error: errorHandler(error) });
  }

  const schedule: any = createSchedule(
    body.StartDate,
    body.StartTime,
    body.Duration
  );

  const newSession = new Session({
    _id: new mongoose.Types.ObjectId(),
    views_id: session_views_id,
    views_group_id: session_views_group_id,
    association_id: associationID,
    start_time: schedule.start_time,
    end_time: schedule.end_time,
    is_cancelled: false,
    notes: [],
  });

  newSession.save().catch((error) => {
    return res.json(error);
  });

  return res.json({
    success: `created session`,
  });
};

export const updateSessions = async (req: Request, res: Response) => {
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
    is_cancelled: body.Cancelled,
  };

  await Session.findOneAndUpdate({ _id: session_mongo_id }, updates).exec();

  try {
    const ViewsData = await sendViewsRequests(url, http.put, body);
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "updateSessions", error: errorHandler(error) });
  }
  return res.json({
    success: `updated session`,
  });
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
  const session_mongo_id: string = req.params.sessionID as string;
  const note_mongo_id: string = req.params.noteID as string;

  const session: any = await Session.findOne(
    note_mongo_id
      ? {
          _id: session_mongo_id,
          "notes._id": note_mongo_id,
        }
      : {
          _id: session_mongo_id,
        },
    note_mongo_id
      ? {
          "notes.$": 1,
        }
      : {}
  ).exec();
  return res.json(session.notes);
};

export const createNotes = async (req: Request, res: Response) => {
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

  let ViewsData;
  try {
    ViewsData = await sendViewsRequests(url, http.post, body);
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "createNotes", error: errorHandler(error) });
  }
  await Session.findByIdAndUpdate(session_mongo_id, {
    $push: {
      notes: {
        views_id: ViewsData.data.NoteID,
        description: body.Note,
      },
    },
  }).exec();

  return res.json({ success: "created note" });
};

export const updateNotes = async (req: Request, res: Response) => {
  const session_mongo_id: string = req.params.sessionID as string;
  const note_mongo_id: string = req.params.noteID as string;

  const session: any = await Session.findOne(
    {
      _id: session_mongo_id,
      "notes._id": note_mongo_id,
    },
    {
      views_id: 1,
      "notes.$": 1,
    }
  ).exec();
  if (!session) return res.json({ error: "session not found" });

  const note_views_id = session.notes[0].views_id as string;

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

  try {
    const ViewsData = await sendViewsRequests(url, http.put, body);
    if (ViewsData.ERROR) return res.status(400).json(ViewsData);
  } catch (error: unknown) {
    return res
      .status(400)
      .json({ function: "updateNotes", error: errorHandler(error) });
  }

  await Session.findOneAndUpdate(
    { _id: session_mongo_id, "notes._id": note_mongo_id },
    {
      $set: {
        "notes.$.description": body.Note,
      },
    }
  ).exec();

  return res.json({ success: "updated note" });
};
