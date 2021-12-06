import { ReactComponent as BaytreeTreeGrey } from "../../assets/images/baytree-tree-grey.svg";
import { SessionItem, SessionItemProps } from "../SessionItem";
import { FC, useEffect, useState } from "react";
import { Endpoints, RequestType, sendRequest } from "../../util/request";
import { showMessageToast, MessageToastType } from "../MessageToast";

interface MenteeSessionListProps {
  associationId: string;
}

export const MenteeSessionList: FC<MenteeSessionListProps> = ({
  associationId
}) => {
  const [sessionList, setSessionList] = useState<SessionItemProps[]>();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    sendRequest(RequestType.GET, {
      endpoint: Endpoints.associationSessions,
      params: [{ name: "association_id", value: associationId }]
    })
      .then(({ data }) => {
        setSessionList(data);
        setIsEmpty(data.length === 0);
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to load sessions")
      );
  }, [associationId]);

  return (
    <div className={`session-list ${isEmpty ? "empty" : ""}`}>
      {isEmpty && (
        <div className="empty-state">
          <BaytreeTreeGrey />
          <h1 className="widget-title">No Sessions with this Mentee</h1>
          <p>
            Create a new session to keep track of your meetings and goal
            progress
          </p>
        </div>
      )}
      {sessionList &&
        sessionList.map(
          ({ notes, _id, start_time, end_time }: SessionItemProps) => (
            <SessionItem
              key={_id}
              notes={notes}
              _id={_id}
              start_time={start_time}
              end_time={end_time}
            />
          )
        )}
    </div>
  );
};
