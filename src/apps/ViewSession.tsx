import { FC, useEffect, useState } from "react";
import { FormField } from "../components/form/FormField";
import { InputNotes } from "../components/form/InputNotes";
import { IconName } from "../components/Icon";
import { TextInput } from "../components/form/TextInput";
import PageHelmet from "../util/PageHelmet";
import { DateInput } from "../components/form/DateInput";
import { TimeInput } from "../components/form/TimeInput";
import { Checkbox } from "../components/form/Checkbox";
import { useParams } from "react-router";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { showMessageToast, MessageToastType } from "../components/MessageToast";
import { SessionItemProps } from "../components/SessionItem";

const ViewSession: FC = () => {
  const { session_id } = useParams<{ session_id: string }>();
  const [notes, setNotes] = useState<string>();
  const [isCancelled, setIsCancelled] = useState<boolean>();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    sendRequest(RequestType.GET, {
      endpoint: Endpoints.session,
      params: [{ name: "session_id", value: session_id }]
    })
      .then(({ data }) => {
        const {
          notes,
          start_time,
          end_time,
          is_cancelled,
          name
        }: SessionItemProps & { is_cancelled: boolean; name: string } = data;

        setNotes(notes.description);
        setIsCancelled(is_cancelled);
        setStartTime(new Date(start_time));
        setEndTime(new Date(end_time));
        setDate(new Date(start_time));
        setName(name);
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to load session")
      );
  }, [session_id]);

  return (
    <main className="container">
      <PageHelmet title="View Session" />

      <h1 className="page-title">View Session</h1>
      <form className="form">
        <p className="subtext">
          This is a view-only page. To change any fields, please contact an
          admin
        </p>
        {isCancelled !== undefined && (
          <Checkbox
            isChecked={isCancelled}
            label="Cancelled"
            isDisabled={true}
          />
        )}

        {name !== undefined && (
          <FormField labelText="Mentee">
            <TextInput
              rightIconName={IconName.smiley}
              initialValue={name}
              placeholderText="Mentee Name"
              isDisabled={true}
            />
          </FormField>
        )}

        {date !== undefined && (
          <FormField labelText="Date">
            <DateInput
              name="date"
              id="inputDate"
              initialValue={date}
              isDisabled={true}
            />
          </FormField>
        )}

        {startTime !== undefined && (
          <FormField labelText="Start Time">
            <TimeInput
              name="start_time"
              initialValue={startTime}
              isDisabled={true}
            />
          </FormField>
        )}

        {endTime !== undefined && (
          <FormField labelText="End Time">
            <TimeInput
              name="end_time"
              initialValue={endTime}
              isDisabled={true}
            />
          </FormField>
        )}

        {notes !== undefined && (
          <FormField labelText="Notes">
            <InputNotes
              placeholderText="Add notes about your session..."
              name="notes"
              isDisabled={true}
              initialValue={notes}
            />
          </FormField>
        )}
      </form>
    </main>
  );
};

export default ViewSession;
