import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormField } from "../components/form/FormField";
import { InputNotes } from "../components/form/InputNotes";
import { RenderAttributes } from "../components/form/RenderAttributes";
import { ContainedIcon, IconColors, IconName } from "../components/Icon";
import { getFormattedTimeString } from "../util/date";
import { Paths } from "../util/routes";
import { NewSessionProps } from "./NewSession";

const CurrentSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
  notes,
}) => {
  const [inputEndTime, setEndTime] = useState(
    (actualclockOutTime = (() => {
      const date = new Date();
      date.setHours(NaN);
      return date;
    })())
  );

  menteeName = "Melissa Nguyen";
  date = "2021-09-19";
  actualclockInTime = (() => {
    const date = new Date();
    return date;
  })();

  const EndSessionClick = (event: any): void => {
    setEndTime(() => {
      const date = new Date();
      return date;
    });
    event.preventDefault();
  };

  return (
    <main className="container">
      <h1 className="page-title">Current Session</h1>
      <form className="form">
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
          <div className="clock-out-element">
            <RenderAttributes
              attribute={getFormattedTimeString(inputEndTime)}
              rightIconName={IconName.clock}
              isClockOut={true}
            />
            <span id="actualclockOutTime" onClick={EndSessionClick}>
              <ContainedIcon
                name={IconName.autocomplete}
                color={IconColors.white}
                backgroundColor={IconColors.baytreeGreen}
              />
            </span>
          </div>
        </FormField>

        <FormField labelText="Notes">
          <InputNotes
            placeholderText="Your notes..."
            name="notes"
            id="notes"
            isDisabled={false}
            notes=""
          />
        </FormField>

        <div className="actions">
          <button type="button" className="btn btn-secondary">
            Save
          </button>
          <Link to={Paths.dashboard} className="btn">
            End Session
          </Link>
        </div>
      </form>
    </main>
  );
};

export default CurrentSession;
