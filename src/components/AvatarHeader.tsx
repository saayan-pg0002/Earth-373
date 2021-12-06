import React from "react";
import Link from "./Link";
import { Paths } from "../util/routes";
import { Avatar } from "@mui/material";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import {
  getLocalStorageItem,
  storeLocalStorageItem
} from "../util/localStorage";

export interface AvatarHeaderProps {
  name?: string | null;
  img?: string;
}

export const GetUserName = (): string | undefined | null => {
  const [avatar, setAvatar] = React.useState<string | undefined | null>(
    getLocalStorageItem("initial")
  );
  if (getLocalStorageItem("token")) {
    if (
      !getLocalStorageItem("initial") ||
      getLocalStorageItem("initial") === "undefined"
    ) {
      sendRequest(RequestType.GET, { endpoint: Endpoints.me })
        .then(({ data }) => {
          storeLocalStorageItem("initial", data?.["first_name"][0]);
          setAvatar(data?.["first_name"][0]);
        })
        .catch((err) => {
          storeLocalStorageItem("initial", undefined);
        });
    }
  }
  return avatar;
};

export const AvatarHeader: React.FC<AvatarHeaderProps> = () => {
  return (
    <div className="avatar-header">
      <Link to={Paths.newSession} className="new-session">
        <button className="btn-small">New Session</button>
      </Link>
      <Link to={Paths.settings} className="avatar">
        <Avatar children={GetUserName()} />
      </Link>
    </div>
  );
};
