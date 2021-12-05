import { FC } from "react";
import { routeTo } from "../util/routes";

export interface ParamsAndQueriesInterface {
  name: string;
  value: string;
}
interface LinkProps {
  to: string;
  params?: ParamsAndQueriesInterface[];
  queries?: ParamsAndQueriesInterface[];
  className?: string;
}

const Link: FC<LinkProps> = ({
  to: path,
  params = [],
  queries = [],
  className = "",
  children
}) => {
  const href: string = buildPath(path, params, queries);

  const onClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    routeTo(href);
  };

  return (
    <a onClick={onClick} href={href} className={className}>
      {children}
    </a>
  );
};

export const buildPath = (
  path: string,
  params: ParamsAndQueriesInterface[] = [],
  queries: ParamsAndQueriesInterface[] = []
): string => {
  for (const { name, value } of params) {
    path = path.replace(`:${name}`, value);
  }

  for (const { name, value } of queries) {
    path = `${path}?${name}=${value}`;
  }

  return path;
};

export default Link;
