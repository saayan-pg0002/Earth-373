import React from "react";
import { FormField } from "../components/form/FormField";
import { InputNotes } from "../components/form/InputNotes";
import { IconName } from "../components/Icon";
import { TextInput } from "../components/form/TextInput";
import PageHelmet from "../util/PageHelmet";
import { NewSessionProps } from "./NewSession";
import { DateInput } from "../components/form/DateInput";
import { TimeInput } from "../components/form/TimeInput";

const ViewSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  startTime,
  endTime,
  notes,
}) => {
  menteeName = "Melissa Nguyen";
  date = new Date();
  startTime = new Date();
  startTime.setHours(20, 0);
  endTime = new Date();
  endTime.setHours(22, 0);
  notes = "Learn Math";

  return (
    <main className="container">
      <PageHelmet title="View Session" />

      <h1 className="page-title">View Session</h1>
      <form className="form">
        <p className="subtext">
          This is a view-only page. To change any fields, please contact an
          admin
        </p>
        <FormField labelText="Mentee">
          <TextInput
            rightIconName={IconName.smiley}
            initialValue="Melissa Nguyen"
            placeholderText="Mentee Name"
            isDisabled={true}
          />
        </FormField>

        <FormField labelText="Date">
          <DateInput
            name="date"
            id="inputDate"
            initialValue={date}
            isDisabled={true}
          />
        </FormField>

        <FormField labelText="Start Time">
          <TimeInput
            name="start_time"
            initialValue={startTime}
            isDisabled={true}
          />
        </FormField>

        <FormField labelText="End Time">
          <TimeInput name="end_time" initialValue={endTime} isDisabled={true} />
        </FormField>

        <FormField labelText="Notes">
          <InputNotes
            placeholderText="Add notes about your session..."
            name="notes"
            isDisabled={true}
            initialValue={notes}
          />
        </FormField>
      </form>
    </main>
  );
};

export default ViewSession;
