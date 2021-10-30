import React from "react";
import { DateInput } from "../components/form/DateInput";
import { FormField } from "../components/form/FormField";
import { IconName } from "../components/Icon";
import PageHelmet from "../util/PageHelmet";

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
  BirthDate,
}) => {
  menteeName = "Melissa Nguyen";
  StartDate = new Date();

  return (
    <main className="container">
      <PageHelmet title="Edit Mentee" />

      <h1 className="page-title">Edit Mentee</h1>

      <h3 className="page-title"> {menteeName}</h3>

      <form className="form">
        <FormField labelText="Start Date">
          <DateInput date={StartDate} rightIconName={IconName.calendar} />
        </FormField>

        <FormField labelText="End Date">
          <DateInput date={EndDate} rightIconName={IconName.calendar} />
        </FormField>

        <FormField labelText="Birthday">
          <DateInput date={BirthDate} rightIconName={IconName.calendar} />
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
