import PageHelmet from "../util/PageHelmet";
import { MenteeList } from "../components/MenteeList";
import { MenteeItemProps } from "../components/MenteeItem";
import { AvatarHeader } from "../components/AvatarHeader";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { useState, useEffect } from "react";

const Mentees: React.FC<{}> = () => {
  const [menteeList, setMenteeList] = useState<MenteeItemProps[]>([]);
  const [pastMenteeList, setPastMenteeList] = useState<MenteeItemProps[]>([]);

  useEffect(() => {
    sendRequest(RequestType.GET, Endpoints.myAssociations).then(
      ({ data: { associations } }) => {
        const ongoingMentees: MenteeItemProps[] = associations.filter(
          (association: MenteeItemProps) => association.isActive
        );
        const pastMentees: MenteeItemProps[] = associations.filter(
          (association: MenteeItemProps) => !association.isActive
        );

        setMenteeList(ongoingMentees);
        setPastMenteeList(pastMentees);
      }
    );
  }, []);

  return (
    <main className="mentees">
      <PageHelmet title="Mentees" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Mentees</h1>
          <AvatarHeader name="Wendy Evans" />
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
