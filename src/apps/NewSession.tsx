import PageHelmet from "../util/PageHelmet";
import { Link } from "react-router-dom";
import { DropdownMenu } from "../components/form/DropdownMenu";
import { FormField } from "../components/form/FormField";
import { RenderAttributes } from "../components/form/RenderAttributes";
import { IconName } from "../components/Icon";
import { getFormattedTimeString } from "../util/date";
import { Paths } from "../util/routes";

export interface NewSessionProps {
  menteeName: string;
  date: string;
  actualclockInTime: Date;
  actualclockOutTime: Date;
  notes?: string;
}

const menteeNameList: string[] = [
  "Melissa Nguyen",
  "Dianne Russell",
  "Tessa Pampangan",
];

const NewSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
}) => {
  date = "2021-09-19";
  const temp = new Date();
  temp.setHours(NaN);
  actualclockInTime = temp;
  actualclockOutTime = temp;

  return (
    <main className="container">
      <PageHelmet title="New Session" />

      <h1 className="page-title">New Session</h1>
      <form className="form">
        <FormField labelText="Mentee">
          <DropdownMenu options={menteeNameList} />
        </FormField>

        <FormField labelText="Date">
          <RenderAttributes
            attribute={date}
            rightIconName={IconName.calendar}
          />
        </FormField>

        <FormField labelText="Start Time">
          <RenderAttributes
            attribute={getFormattedTimeString(actualclockInTime)}
            rightIconName={IconName.clock}
          />
        </FormField>

        <div className="actions">
          <Link to={Paths.currentSession} className="btn">
            Start Session
          </Link>
        </div>
      </form>
    </main>
  );
};

export default NewSession;
