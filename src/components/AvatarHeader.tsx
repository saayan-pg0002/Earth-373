import React, { useState } from "react";
import Link from "./Link";
import { Paths } from "../util/routes";
import { Avatar } from "@mui/material";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { MessageToastType, showMessageToast } from "./MessageToast";
import {
  getLocalStorageItem,
  storeLocalStorageItem,
} from "../util/localStorage";

export interface AvatarHeaderProps {
  name: string;
  img?: string;
}

const GetUserName = (): string | undefined => {
  const [avatar, setAvatar] = React.useState<string | undefined>();
  sendRequest(RequestType.GET, Endpoints.me)
    .then(({ data }) => {
      storeLocalStorageItem("firstName", data?.["first_name"]);
      setAvatar(data?.["first_name"][0]);
    })
    .catch((err) => {
      showMessageToast(MessageToastType.ERROR, "Unable to load your avatar");
    });
  return avatar;
};

export const AvatarHeader: React.FC<AvatarHeaderProps> = () => {
  let avatar = getLocalStorageItem("firstName"[0])
    ? getLocalStorageItem("firstName")
    : GetUserName();
  return (
    <div className="avatar">
      <Link to={Paths.settings}>
        <Avatar children={avatar} />
      </Link>
    </div>
  );
};
