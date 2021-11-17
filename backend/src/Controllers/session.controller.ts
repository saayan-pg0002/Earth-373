import { Request, Response } from "express";
import { sendViewRequests, errorHandler, http } from "../util";
import getCurrentLine from "get-current-line";

export const getSessions = async (req: Request, res: Response) => {
  const groupID = req.params.groupID;
  const sessionID = req.params.sessionID;
  const user: any = req.user;
  let url: string = "";

  switch (groupID) {
    case undefined: // get all sessions
      url =
        "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/search";
      break;
    case "associated": // get associated sessions
      url =
        "https://app.viewsapp.net/api/restful/contacts/volunteers/" +
        user.views_id +
        "/sessions/";
      break;
    default:
      // get sessions by groupID or sessionID
      url =
        sessionID === undefined
          ? "https://app.viewsapp.net/api/restful/work/sessiongroups/" +
            groupID +
            "/sessions"
          : "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
            sessionID;
  }

  try {
    const response: any = await sendViewRequests(url, http.get, undefined);
    const length = Object.keys(response.data).length;
    return res.json({
      session_counts: `${length}`,
      data: response.data,
    });
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "getSessions", `line ${getCurrentLine().line}`)
      );
  }
};

export const createSessions = async (req: Request, res: Response) => {
  const groupID: string = req.params.groupID;
  const user: any = req.user;
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

  let response: any;
  try {
    response = await sendViewRequests(url, http.post, body);
    if (Object.keys(response.data)[0] === "errors") {
      return res.status(400).json(response.data);
    }
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "createSessions", `line ${getCurrentLine().line}`)
      );
  }

  const sessionID: string = response.data.SessionID;
  url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID +
    "/staff/";

  try {
    await sendViewRequests(url, http.put, { ContactID: user.views_id });
    return res.json({
      success: `created session ${sessionID} under session group ${groupID}`,
    });
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "createSessions", `line ${getCurrentLine().line}`)
      );
  }
};

export const updateSessions = async (req: Request, res: Response) => {
  const sessionID: string = req.params.sessionID;
  let url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID;
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

  try {
    const response = await sendViewRequests(url, http.put, body);
    if (Object.keys(response.data)[0] === "errors") {
      return res.status(400).json(response.data);
    }
    return res.json({
      success: `updated session ${sessionID}`,
    });
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "updateSessions", `line ${getCurrentLine().line}`)
      );
  }
};

// TODO: store sessions in Mongo //
// export const migrateSessions = async (req: Request, res: Response) => {
//   let url: string =
//     "https://app.viewsapp.net/api/restful/work/sessiongroups/14/sessions";
//   try {
//     const response = await sendViewRequests(url, http.get, undefined);
//     const sessions = response.data;
//     for (var i in sessions) {
//       const session = sessions[i];
//     }
//   } catch (error: unknown) {
//     res
//       .status(400)
//       .json(
//         errorHandler(error, "migrateSessions", `line ${getCurrentLine().line}`)
//       );
//   }
// };

export const getAttendees = async (req: Request, res: Response) => {
  const sessionID: string = req.params.sessionID;
  const type: string = req.params.type;
  let url: string =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID;
  switch (type) {
    case "participants":
      url += "/participants";
      break;
    default:
      url += "/staff";
  }
  try {
    const response: any = await sendViewRequests(url, http.get, undefined);
    return res.json(response.data);
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "getAttendees", `line ${getCurrentLine().line}`)
      );
  }
};

export const getNotes = async (req: Request, res: Response) => {
  const sessionID: string = req.params.sessionID as string;
  const noteID: string = req.params.noteID as string;

  let url: string =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID +
    "/notes";
  if (noteID) url += "/" + noteID;

  try {
    const response = await sendViewRequests(url, http.get, undefined);
    return res.json(response.data);
  } catch (error: unknown) {
    return res
      .status(400)
      .json(errorHandler(error, "getNotes", `line ${getCurrentLine().line}`));
  }
};

export const createNotes = async (req: Request, res: Response) => {
  const sessionID: string = req.params.sessionID as string;

  let url: string =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID +
    "/notes";

  var body: {
    Note: string;
  } = req.body;

  if (body.Note === undefined) {
    return res.status(400).json({ error: "Note field must have values" });
  }
  try {
    const response = await sendViewRequests(url, http.post, body);
    return res.json(
      `Created notes '${response.data.Note}' under session ${sessionID}`
    );
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "createNotes", `line ${getCurrentLine().line}`)
      );
  }
};

export const updateNotes = async (req: Request, res: Response) => {
  const sessionID: string = req.params.sessionID as string;
  const noteID: string = req.params.noteID as string;

  let url: string =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID +
    "/notes/" +
    noteID;

  var body: {
    Note: string;
  } = req.body;

  if (body.Note === undefined) {
    return res.status(400).json({ error: "Note field must have values" });
  }
  try {
    const response = await sendViewRequests(url, http.put, body);
    return res.json(
      `Updated notes '${response.data.Note}' under session ${sessionID}`
    );
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "updateNotes", `line ${getCurrentLine().line}`)
      );
  }
};
