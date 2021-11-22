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
  name?: string | null;
  img?: string;
}

export const GetUserName = (): string | undefined | null => {
  const [avatar, setAvatar] = React.useState<string | undefined | null>(
    getLocalStorageItem("Initial")
  );
  if (getLocalStorageItem("token")) {
    if (!getLocalStorageItem("firstName")) {
      sendRequest(RequestType.GET, Endpoints.type)
        .then(({ data }) => {
          console.log(data);
          storeLocalStorageItem("Initial", data?.["first_name"][0]);
          setAvatar(data?.["first_name"][0]);
        })
        .catch((err) => {
          storeLocalStorageItem("Initial", undefined);
        });
    }
  }

  return avatar;
};

export const AvatarHeader: React.FC<AvatarHeaderProps> = ({}) => {
  return (
    <div className="avatar">
      <Link to={Paths.settings}>
        <Avatar children={GetUserName()} />
      </Link>
    </div>
  );
};
