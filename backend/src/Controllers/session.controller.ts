import { Request, Response } from "express";
import { sendViewRequests, errorHandler } from "../util";
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
    const response: any = await sendViewRequests(url, "GET", undefined);
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
    LeadStaff: string;
    VenueID: string;
  } = req.body;

  let response: any;
  try {
    response = await sendViewRequests(url, "POST", body);
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
    await sendViewRequests(url, "PUT", { ContactID: user.views_id });
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
    const response: any = await sendViewRequests(url, "GET", undefined);
    return res.json(response.data);
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "getAttendees", `line ${getCurrentLine().line}`)
      );
  }
};

export const requestNotes = async (req: Request, res: Response) => {
  const method: string = req.params.method as string;
  const sessionID: string = req.params.id as string;
  let url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    sessionID +
    "/notes";
  var body: {
    Note: string;
    Private: string;
  };
  body = req.body;
  try {
    const response = await sendViewRequests(url, method, body);
    return res.json(response.data);
  } catch (error: unknown) {
    return res
      .status(400)
      .json(
        errorHandler(error, "requestNotes", `line ${getCurrentLine().line}`)
      );
  }
};
