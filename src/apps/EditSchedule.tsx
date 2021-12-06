import React from "react";
import { Link } from "react-router-dom";
import { DropdownMenu } from "../components/form/DropdownMenu";
import { FormField } from "../components/form/FormField";
import { TimeInput } from "../components/form/TimeInput";
import { MenteeInfoProps } from "../components/mentee_profile/MenteeGoals";
import { DaysOfWeek } from "../util/date";
import PageHelmet from "../util/PageHelmet";
import { Paths } from "../util/routes";

const EditSchedule: React.FC<MenteeInfoProps> = ({
  sessionDay,
  sessionTime
}) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      sessionDay: { value: string };
      sessionTime: { value: string };
    };

    sessionDay = target.sessionDay.value;
    sessionTime = target.sessionTime.value;

    console.log(`Every ${sessionDay} at ${sessionTime}`);
  };
  const time: Date = (() => {
    const date = new Date();
    date.setHours(19, 0);
    return date;
  })();
  return (
    <main>
      <PageHelmet title="Edit Schedule" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Edit Schedule</h1>
          <Link to={Paths.menteeProfileGoals} className="back-btn">
            Go Back
          </Link>
        </div>

        <form onSubmit={onSubmit} className="form">
          <FormField labelText="Day">
            <DropdownMenu
              name="sessionDay"
              options={DaysOfWeek.map((day) => ({ label: day, value: day }))}
            />
          </FormField>

          <FormField labelText="Start Time">
            <TimeInput name="sessionTime" initialValue={time} />
          </FormField>

          <div className="actions">
            <button type="submit" className="btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditSchedule;
