import React from "react";
import { Link } from "react-router-dom";
import { DateInput } from "../components/form/DateInput";
import { DropdownMenu } from "../components/form/DropdownMenu";
import { FormField } from "../components/form/FormField";
import { TimeInput } from "../components/form/TimeInput";
import { DaysOfWeek } from "../util/date";
import PageHelmet from "../util/PageHelmet";
import { Paths } from "../util/routes";

interface EditMenteeProp {
  menteeName: string;
  StartDate: Date;
  EndDate: Date;
  BirthDate: Date;
}

const EditMentee: React.FC<EditMenteeProp> = ({
  menteeName,
  StartDate,
  EndDate,
  BirthDate
}) => {
  menteeName = "Melissa Nguyen";
  StartDate = new Date();

  return (
    <main className="container">
      <PageHelmet title="Edit Mentee" />

      <div className="header">
        <h1 className="page-title">Edit Mentee</h1>
        <Link to={Paths.menteeProfileGoals} className="back-btn">
          Go Back
        </Link>
      </div>

      <h2 className="h2"> {menteeName}</h2>
      <form className="form">
        <FormField labelText="Start Date">
          <DateInput initialValue={StartDate} />
        </FormField>

        <FormField labelText="End Date">
          <DateInput initialValue={EndDate} />
        </FormField>

        <FormField labelText="Birthday">
          <DateInput initialValue={BirthDate} />
        </FormField>
      </form>

      <h2 className="h2"> Schedule</h2>
      <form className="form">
        {/* <FormField labelText="Day">
          <DropdownMenu options={DaysOfWeek} />
        </FormField> */}

        <FormField labelText="Start Time">
          <TimeInput initialValue={EndDate} />
        </FormField>

        <div className="actions">
          <button type="button" className="btn">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditMentee;
