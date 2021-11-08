import { FC } from "react";
import { ReactComponent as BaytreeTreeGrey } from "../assets/images/baytree-tree-grey.svg";

interface EmptyStateProps {
  title: string;
  message: string;
  showGraphic?: boolean;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title,
  message,
  showGraphic = true,
}) => {
  return (
    <div className="empty-state">
      {showGraphic && <BaytreeTreeGrey />}
      <h1 className="widget-title">{title}</h1>
      <p>{message}</p>
    </div>
  );
};
