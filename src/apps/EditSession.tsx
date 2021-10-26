import React from "react";
import { FormField } from "../components/form/FormField";
import { InputNotes } from "../components/form/InputNotes";
import { RenderAttributes } from "../components/form/RenderAttributes";
import { IconName } from "../components/Icon";
import { getFormattedTimeString } from "../util/date";
import { NewSessionProps } from "./NewSession";

const EditSession: React.FC<NewSessionProps> = ({
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

  return (
    <main className="container">
      <h1 className="page-title">Edit Session</h1>
      <form>
        <FormField labelText="Mentee">
          <RenderAttributes attribute={menteeName} />
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
            isDisabled={false}
            notes={notes}
          />
        </FormField>
        <p>
          <button type="button" className="btn">
            Save
          </button>
        </p>
      </form>
    </main>
  );
};

export default EditSession;
