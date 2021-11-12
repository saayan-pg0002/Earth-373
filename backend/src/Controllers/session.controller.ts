import { Request, Response } from "express";
import axios, { Method } from "axios";

const sendViewRequests = async (url: string, method: string, body: any) => {
  let sessions: any;
  await axios({
    method: method as Method,
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    data: body,
    responseType: "json",
  })
    .then((response) => {
      sessions = response.data;
    })
    .catch((error) => {
      return error;
    });
  return sessions;
};

const errorHandler = (error: unknown, scope: string, block: any) => {
  if (error instanceof Error) {
    return {
      ERROR: `${error}`,
      SCOPE: "getSessions",
      BLOCK: block,
      STACK: error.stack,
    };
  } else {
    return { ERROR: "An unidentified error has occurred" };
  }
};

const getSessions = async (req: Request, res: Response) => {
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
      url =
        sessionID === undefined
          ? "https://app.viewsapp.net/api/restful/work/sessiongroups/" +
            groupID +
            "/sessions"
          : "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
            sessionID;
  }

  try {
    const data: any = await sendViewRequests(url, "GET", undefined);
    const length = Object.keys(data).length;
    return res.json({
      counts: `${length}`,
      data: data,
    });
  } catch (error: unknown) {
    res.status(400);
    return res.json(errorHandler(error, "getSessions", undefined));
  }
};

const createSessions = async (req: Request, res: Response) => {
  const user: any = req.user;
  let url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/14/sessions";
  var body: {
    Name: string;
    StartDate: string;
    StartTime: string;
    Duration: string;
    LeadStaff: string;
    VenueID: string;
  };
  body = req.body;

  let data: any;
  try {
    data = await sendViewRequests(url, "POST", body);
  } catch (error: unknown) {
    res.status(400);
    return res.json(
      errorHandler(error, "createSessions", "POST sendViewRequests")
    );
  }

  const SessionID: string = data.SessionID;
  url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    SessionID +
    "/staff/";

  try {
    await sendViewRequests(url, "PUT", { ContactID: user.views_id });
    return res.json({
      message: `created session ${SessionID}`,
    });
  } catch (error: unknown) {
    res.status(400);
    return res.json(
      errorHandler(error, "createSessions", "PUT sendViewRequests")
    );
  }
};

const requestNotes = async (req: Request, res: Response) => {
  const method: string = req.params.method as string;
  const SessionID: string = req.params.id as string;
  let url =
    "https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/" +
    SessionID +
    "/notes";
  var body: {
    Note: string;
    Private: string;
  };
  body = req.body;
  try {
    const data = await sendViewRequests(url, method, body);
    return res.json(data);
  } catch (error: unknown) {
    res.status(400);
    return res.json(errorHandler(error, "requestNotes", undefined));
  }
};

export default {
  getSessions,
  createSessions,
  requestNotes,
};
