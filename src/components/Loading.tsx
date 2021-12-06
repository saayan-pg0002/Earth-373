import { FC } from "react";

interface LoadingProps {
  load: any;
}

export const Loading: FC<LoadingProps> = ({ load, children }) => {
  return load ? (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  ) : (
    <>{children}</>
  );
};
