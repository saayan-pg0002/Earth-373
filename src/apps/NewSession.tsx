import PageHelmet from "../util/PageHelmet";
import { DropdownMenu } from "../components/form/DropdownMenu";
import { FormField } from "../components/form/FormField";
import { DateInput } from "../components/form/DateInput";
import { InputNotes } from "../components/form/InputNotes";
import { TimeInput } from "../components/form/TimeInput";
import { Checkbox } from "../components/form/Checkbox";

const ActiveMenteeList: string[] = ["Melissa Nguyen", "Dianne Russell"];

export interface NewSessionProps {
  menteeName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  notes: string;
  isCancelled: boolean;
}

const NewSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  startTime,
  endTime,
  notes,
  isCancelled,
}) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      mentee_name: { value: string };
      date: { value: string };
      start_time: { value: Date };
      end_time: { value: Date };
      notes: { value: string };
    };

    const mentee_name = target.mentee_name.value;
    const date = target.date.value;
    const start_time = target.start_time.value;
    const end_time = target.end_time.value;
    const notes = target.notes.value;
  };

  return (
    <main className="container">
      <PageHelmet title="New Session" />

      <h1 className="page-title">New Session</h1>
      <form onSubmit={onSubmit} className="form">
        <Checkbox isChecked={false} label="Cancelled" />

        <FormField labelText="Mentee">
          <DropdownMenu options={ActiveMenteeList} name="mentee_name" />
        </FormField>

        <FormField labelText="Date">
          <DateInput name="date" id="inputDate" />
        </FormField>

        <FormField labelText="Start Time">
          <TimeInput name="start_time" />
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
    </main>
  );
};

export default NewSession;
