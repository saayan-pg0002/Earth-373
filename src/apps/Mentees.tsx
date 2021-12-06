import PageHelmet from "../util/PageHelmet";
import { MenteeList } from "../components/MenteeList";
import { MenteeItemProps } from "../components/MenteeItem";
import { AvatarHeader } from "../components/AvatarHeader";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { useState, useEffect } from "react";
import { showMessageToast, MessageToastType } from "../components/MessageToast";

const Mentees: React.FC<{}> = () => {
  const [menteeList, setMenteeList] = useState<MenteeItemProps[]>([]);
  const [pastMenteeList, setPastMenteeList] = useState<MenteeItemProps[]>([]);

  useEffect(() => {
    sendRequest(RequestType.GET, { endpoint: Endpoints.myMentees })
      .then(({ data: { mentees } }) => {
        const ongoingMentees: MenteeItemProps[] = mentees.filter(
          (mentee: MenteeItemProps) => mentee.is_active
        );
        const pastMentees: MenteeItemProps[] = mentees.filter(
          (mentee: MenteeItemProps) => !mentee.is_active
        );

        setMenteeList(ongoingMentees);
        setPastMenteeList(pastMentees);
      })
      .catch((err) =>
        showMessageToast(MessageToastType.ERROR, "Unable to fetch mentees")
      );
  }, []);

  return (
    <main className="mentees">
      <PageHelmet title="Mentees" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Mentees</h1>
          <AvatarHeader />
        </div>
        <MenteeList mentees={menteeList} showEmptyState={true} />
        {pastMenteeList.length > 0 && (
          <>
            <p className="subtext">Past Mentees</p>
            <MenteeList mentees={pastMenteeList} />
          </>
        )}
      </div>
    </main>
  );
};

export default Mentees;
