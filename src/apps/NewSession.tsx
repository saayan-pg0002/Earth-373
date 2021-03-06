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
import { Loading } from "../components/Loading";
import { routeTo, Paths } from "../util/routes";
import { buildPath } from "../components/Link";

export interface NewSessionProps {
  menteeName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  notes: string;
  isCancelled: boolean;
}

interface SessionGroupInterface {
  session_group_id: string;
  name: string;
  venue_id: string;
  lead_staff: string;
}

const NewSession: FC<{}> = () => {
  const [menteeOptions, setMenteeOptions] =
    useState<DropdownMenuOptionsProps[]>();
  const [sessionGroupOptions, setSessionGroupOptions] =
    useState<DropdownMenuOptionsProps[]>();
  const [sessionGroups, setSessionGroups] = useState<SessionGroupInterface[]>();
  const [isNotSubmitting, setIsNotSubmitting] = useState<boolean>(true);

  const getSessionGroupInfo = (sessionGroupId: string) =>
    sessionGroups?.find(
      (sessionGroup) => sessionGroup.session_group_id === sessionGroupId
    );

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsNotSubmitting(false);

    const target = e.target as typeof e.target & {
      is_cancelled: HTMLInputElement;
      association_id: { value: string };
      session_group_id: { value: string };
      date: { value: string };
      start_time: { value: string };
      end_time: { value: string };
      notes: { value: string };
    };

    const is_cancelled: boolean = target.is_cancelled.checked;
    const association_id: string = target.association_id.value;
    const session_group_id: string = target.session_group_id.value;
    const date: string = target.date.value;
    const start_time: Date = getDateFromTimeString(target.start_time.value);
    const end_time: Date | undefined = !!target.end_time.value
      ? getDateFromTimeString(target.end_time.value)
      : undefined;
    const notes: string = target.notes.value;
    const session_group_info: SessionGroupInterface | undefined =
      getSessionGroupInfo(session_group_id);

    if (!session_group_info) {
      showMessageToast(
        MessageToastType.ERROR,
        "Unable to find info about this session group"
      );
      setIsNotSubmitting(true);
      return;
    }

    if (
      !association_id ||
      !date ||
      !start_time ||
      !notes ||
      (!is_cancelled && !end_time)
    ) {
      showMessageToast(MessageToastType.ERROR, "You are missing a some fields");
      setIsNotSubmitting(true);
      return;
    }

    if (end_time) {
      const duration = getTimeDurationString(start_time, end_time);

      if (!duration) {
        showMessageToast(
          MessageToastType.ERROR,
          "End time must be after start time"
        );
        setIsNotSubmitting(true);
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
      LeadStaff?: string;
    } = {
      StartDate: date,
      StartTime: getFormattedHourMinuteString(start_time),
      Cancelled: is_cancelled
    };

    if (!is_cancelled && end_time) {
      data.EndTime = getFormattedHourMinuteString(end_time);
      data.Duration = getTimeDurationString(start_time, end_time);
    } else {
      data.Duration = "00:00";
    }

    if (session_group_info) {
      data.VenueID = session_group_info.venue_id;
      data.LeadStaff = session_group_info.lead_staff;
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
          .then(() => {
            setIsNotSubmitting(true);
            showMessageToast(
              MessageToastType.SUCCESS,
              "Succesfully Created new session"
            );
            routeTo(
              buildPath(Paths.viewSession, [
                { name: "session_id", value: session_id }
              ])
            );
          })
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

    sendRequest(RequestType.GET, { endpoint: Endpoints.sessionGroups })
      .then(({ data: { session_groups } }) => {
        const sessionGroupList: DropdownMenuOptionsProps[] = session_groups.map(
          ({ session_group_id, name }: SessionGroupInterface) => ({
            label: name,
            value: session_group_id
          })
        );

        setSessionGroupOptions(sessionGroupList);
        setSessionGroups(session_groups);
      })
      .catch(() =>
        showMessageToast(
          MessageToastType.ERROR,
          "Unable to fetch session groups"
        )
      );
  }, []);

  return (
    <main>
      <PageHelmet title="New Session" />

      <div className="container">
        <h1 className="page-title">New Session</h1>
        <Loading load={!sessionGroupOptions}>
          <form onSubmit={onSubmit} className="form">
            <Checkbox isChecked={false} label="Cancelled" name="is_cancelled" />
            {menteeOptions && (
              <FormField labelText="Mentee">
                <DropdownMenu options={menteeOptions} name="association_id" />
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
              <button
                type="submit"
                className={`btn ${!isNotSubmitting ? "submitting" : ""}`}
                disabled={!isNotSubmitting}
              >
                Log Session
                <Loading load={!isNotSubmitting}></Loading>
              </button>
            </div>
          </form>
        </Loading>
      </div>
    </main>
  );
};

export default NewSession;
