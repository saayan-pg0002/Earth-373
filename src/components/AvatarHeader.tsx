import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../util/routes";
import { Avatar } from "@mui/material";

export interface avataHeaderProps {
  userName: string;
  img?: string;
}

const baytreeGreen = "#48b030";

export const AvatarHeader: React.FC<avataHeaderProps> = ({ userName }) => {
  return (
    <div className="avatar">
      <Link to={Paths.settings}>
        <Avatar
          sx={{
            bgcolor: baytreeGreen,
            fontFamily: '"Inter","Helvetica", "Roboto", san-serif',
          }}
          children={userName.split(" ")[0][0]}
        />
      </Link>
    </div>
  );
};
