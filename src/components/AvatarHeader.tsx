import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../util/routes";
import { Avatar } from "@mui/material";

export interface avataHeaderProps {
  userName: string;
  img?: string;
}

export const AvatarHeader: React.FC<avataHeaderProps> = ({ userName }) => {
  const stringToColor = (userName: string): string => {
    let hash: number = 0;

    for (let i: number = 0; i < userName.length; i += 1) {
      hash = userName.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color: string = "#";

    for (let i: number = 0; i < 3; i += 1) {
      const value: number = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  return (
    <div className="avatar">
      <Link to={Paths.settings}>
        <Avatar
          sx={{
            bgcolor: stringToColor(userName),
            fontFamily: '"Inter","Helvetica", "Roboto", san-serif',
          }}
          children={userName.split(" ")[0][0] + userName.split(" ")[1][0]}
        />
      </Link>
    </div>
  );
};
