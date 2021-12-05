import PageHelmet from "../util/PageHelmet";
import {
  DropdownMenu,
  DropdownMenuOptionsProps
} from "../components/form/DropdownMenu";
import { FormField } from "../components/form/FormField";
import { DateInput } from "../components/form/DateInput";
import { InputNotes } from "../components/form/InputNotes";
import { TimeInput } from "../components/form/TimeInput";
import { Checkbox } from "../components/form/Checkbox";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { FC, useState, useEffect } from "react";
import { MenteeItemProps } from "../components/MenteeItem";
import { showMessageToast, MessageToastType } from "../components/MessageToast";
import {
  getTimeDurationString,
  getDateFromTimeString,
  getFormattedHourMinuteString
} from "../util/date";

export interface NewSessionProps {
  menteeName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  notes: string;
  isCancelled: boolean;
}

interface VenueInterface {
  venue_id: string;
  name: string;
}

interface SessionGroupInterface {
  session_group_id: string;
  name: string;
}

const NewSession: FC<{}> = () => {
  const [menteeOptions, setMenteeOptions] =
    useState<DropdownMenuOptionsProps[]>();
  const [venueOptions, setVenueOptions] =
    useState<DropdownMenuOptionsProps[]>();
  const [sessionGroupOptions, setSessionGroupOptions] =
    useState<DropdownMenuOptionsProps[]>();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      is_cancelled: HTMLInputElement;
      association_id: { value: string };
      venue_id: { value: string };
      session_group_id: { value: string };
      date: { value: string };
      start_time: { value: string };
      end_time: { value: string };
      notes: { value: string };
    };

    const is_cancelled: boolean = target.is_cancelled.checked;
    const association_id: string = target.association_id.value;
    const venue_id: string = target.venue_id.value;
    const session_group_id: string = target.session_group_id.value;
    const date: string = target.date.value;
    const start_time: Date = getDateFromTimeString(target.start_time.value);
    const end_time: Date | undefined = !!target.end_time
      ? getDateFromTimeString(target.end_time.value)
      : undefined;
    const notes: string = target.notes.value;

    if (
      !association_id ||
      !venue_id ||
      !session_group_id ||
      !date ||
      !start_time ||
      !notes ||
      (is_cancelled && !end_time)
    ) {
      showMessageToast(MessageToastType.ERROR, "You are missing a some fields");
      return;
    }

    if (end_time) {
      const duration = getTimeDurationString(start_time, end_time);

      if (!duration) {
        showMessageToast(
          MessageToastType.ERROR,
          "End time must be after start time"
        );
        return;
      }
    }

    const data: {
      StartDate: string;
      StartTime: string;
      EndTime?: string;
      VenueID?: string;
      Duration?: string | boolean;
      Cancelled: boolean;
    } = {
      StartDate: date,
      StartTime: getFormattedHourMinuteString(start_time),
      Cancelled: is_cancelled,
      VenueID: venue_id
    };

    if (!is_cancelled && end_time && venue_id) {
      data.EndTime = getFormattedHourMinuteString(end_time);
      data.Duration = getTimeDurationString(start_time, end_time);
    } else {
      data.Duration = "00:00";
    }

    sendRequest(
      RequestType.POST,
      {
        endpoint: Endpoints.createSession,
        params: [
          { name: "session_group_id", value: session_group_id },
          { name: "association_id", value: association_id }
        ]
      },
      data
    )
      .then(({ data: { session_id } }) => {
        sendRequest(
          RequestType.POST,
          {
            endpoint: Endpoints.createNote,
            params: [{ name: "session_id", value: session_id }]
          },
          { Note: notes }
        )
          .then(() =>
            showMessageToast(
              MessageToastType.SUCCESS,
              "Succesfully Created new session"
            )
          )
          .catch(() =>
            showMessageToast(
              MessageToastType.ERROR,
              "Unable to create notes for new session"
            )
          );
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to create new session")
      );
  };

  useEffect(() => {
    sendRequest(RequestType.GET, { endpoint: Endpoints.myMentees })
      .then(({ data: { mentees } }) => {
        const ongoingMentees: MenteeItemProps[] = mentees.filter(
          (mentee: MenteeItemProps) => mentee.is_active
        );

        const menteeList: DropdownMenuOptionsProps[] = ongoingMentees.map(
          ({ mentee_name, association_id }) => ({
            label: mentee_name,
            value: association_id
          })
        );

        setMenteeOptions(menteeList);
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to fetch venues")
      );

    sendRequest(RequestType.GET, { endpoint: Endpoints.venues })
      .then(({ data: { venues } }) => {
        const venueList: DropdownMenuOptionsProps[] = venues.map(
          ({ venue_id, name }: VenueInterface) => ({
            label: name,
            value: venue_id
          })
        );

        setVenueOptions(venueList);
      })
      .catch(() =>
        showMessageToast(MessageToastType.ERROR, "Unable to fetch venues")
      );

    sendRequest(RequestType.GET, { endpoint: Endpoints.sessionGroups })
      .then(({ data: { session_groups } }) => {
        const sessionGroupList: DropdownMenuOptionsProps[] = session_groups.map(
          ({ session_group_id, name }: SessionGroupInterface) => ({
            label: name,
            value: session_group_id
          })
        );

        setSessionGroupOptions(sessionGroupList);
      })
      .catch(() =>
        showMessageToast(
          MessageToastType.ERROR,
          "Unable to fetch session groups"
        )
      );
  }, []);

  return (
    <main className="container">
      <PageHelmet title="New Session" />

      <h1 className="page-title">New Session</h1>
      {menteeOptions && venueOptions && sessionGroupOptions && (
        <form onSubmit={onSubmit} className="form">
          <Checkbox isChecked={false} label="Cancelled" name="is_cancelled" />

          {menteeOptions && (
            <FormField labelText="Mentee">
              <DropdownMenu options={menteeOptions} name="association_id" />
            </FormField>
          )}

          {venueOptions && (
            <FormField labelText="Venue">
              <DropdownMenu options={venueOptions} name="venue_id" />
            </FormField>
          )}

          {sessionGroupOptions && (
            <FormField labelText="Session Group">
              <DropdownMenu
                options={sessionGroupOptions}
                name="session_group_id"
              />
            </FormField>
          )}

          <FormField labelText="Date">
            <DateInput name="date" id="inputDate" initialValue={new Date()} />
          </FormField>

          <FormField labelText="Start Time">
            <TimeInput name="start_time" initialValue={new Date()} />
          </FormField>

          <FormField labelText="End Time">
            <TimeInput name="end_time" />
          </FormField>

          <FormField labelText="Notes">
            <InputNotes
              placeholderText="Add notes about your session..."
              name="notes"
            />
          </FormField>

          <div className="actions">
            <button type="submit" className="btn">
              Log Session
            </button>
          </div>
        </form>
      )}
    </main>
  );
};

export default NewSession;
