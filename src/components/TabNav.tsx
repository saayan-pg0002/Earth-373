import { FC } from "react";
import Link from "../components/Link";
import { useLocation } from "react-router-dom";

interface TabNavProps {
  routes: TabNavItemProps[];
}

export const TabNav: FC<TabNavProps> = ({ routes }) => {
  return (
    <nav className="tab-nav">
      <ul>
        {routes.map(({ label, to }: TabNavItemProps, index: number) => (
          <TabNavItem key={index} label={label} to={to} />
        ))}
      </ul>
    </nav>
  );
};

export interface TabNavItemProps {
  label: string;
  to: string;
}

const TabNavItem: FC<TabNavItemProps> = ({ label, to }) => {
  const isActive: boolean = useLocation().pathname === to;

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to}>{label}</Link>
    </li>
  );
};
