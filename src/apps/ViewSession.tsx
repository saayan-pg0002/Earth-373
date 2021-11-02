import React from "react";
import { FormField } from "../components/form/FormField";
import { InputNotes } from "../components/form/InputNotes";
import { RenderAttributes } from "../components/form/RenderAttributes";
import { IconName } from "../components/Icon";
import { getFormattedTimeString } from "../util/date";
import PageHelmet from "../util/PageHelmet";
import { NewSessionProps } from "./NewSession";

const ViewSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
  notes,
}) => {
  menteeName = "Melissa Nguyen";
  date = "2021-09-19";
  actualclockInTime = (() => {
    const date = new Date();
    date.setHours(20, 0);
    return date;
  })();
  actualclockOutTime = (() => {
    const date = new Date();
    date.setHours(21, 0);
    return date;
  })();
  notes = "Learn Math";

  return (
    <main className="container">
      <PageHelmet title="View Session" />

      <h1 className="page-title">View Session</h1>
      <form className="form">
        <FormField labelText="Mentee">
          <RenderAttributes
            attribute={menteeName}
            rightIconName={IconName.smiley}
          />
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

        <FormField labelText="End Time">
          <RenderAttributes
            attribute={getFormattedTimeString(actualclockOutTime)}
            rightIconName={IconName.clock}
          />
        </FormField>

        <FormField labelText="Notes">
          <InputNotes
            placeholderText="Your notes..."
            name="notes"
            id="notes"
            isDisabled={true}
            notes={notes}
          />
        </FormField>
      </form>
    </main>
  );
};

export default ViewSession;
