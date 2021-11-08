import { FC } from "react";
import { routeTo } from "../util/routes";
import { ORIGIN } from "../util/request";

interface LinkProps {
  to: string;
  className?: string;
}

const Link: FC<LinkProps> = ({ to: path, className = "", children }) => {
  const href: string = `${ORIGIN}/${path}`;

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    routeTo(path);
  };

  return (
    <a onClick={onClick} href={href} className={className}>
      {children}
    </a>
  );
};

export default Link;
