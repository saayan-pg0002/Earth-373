import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../util/routes";
import { Avatar } from "@mui/material";

export interface AvatarHeaderProps {
  name: string;
  img?: string;
}

export const AvatarHeader: React.FC<AvatarHeaderProps> = ({ name }) => {
  return (
    <div className="avatar">
      <Link to={Paths.settings}>
        <Avatar children={name.split(" ")[0][0]} />
      </Link>
    </div>
  );
};
