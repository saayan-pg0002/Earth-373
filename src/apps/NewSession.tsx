import PageHelmet from "../util/PageHelmet";
import { DropdownMenu } from "../components/form/DropdownMenu";
import { FormField } from "../components/form/FormField";
import { IconName } from "../components/Icon";
import { DateInput } from "../components/form/DateInput";
import { InputNotes } from "../components/form/InputNotes";
import { TimeInput } from "../components/form/TimeInput";

const AciveMenteeList: string[] = ["Melissa Nguyen", "Dianne Russell"];

export interface NewSessionProps {
  menteeName: string;
  date: string;
  actualclockInTime: Date;
  actualclockOutTime: Date;
  notes: string;
}

const NewSession: React.FC<NewSessionProps> = ({
  menteeName,
  date,
  actualclockInTime,
  actualclockOutTime,
  notes,
}) => {

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      inputMenteeName: { value: string };
      inputDate: { value: string };
      inputActualclockInTime: { value: Date };
      inputActualclockOutTime: { value: Date };
      inputNotes: { value: string };
    };

    menteeName = target.inputMenteeName.value;
    date = target.inputDate.value;
    actualclockInTime = target.inputActualclockInTime.value;
    actualclockOutTime = target.inputActualclockOutTime.value;
    notes = target.inputNotes.value;

  };

  return (
    <main className="container">
      <PageHelmet title="New Session" />

      <h1 className="page-title">New Session</h1>
      <form onSubmit={onSubmit} className="form">
        <FormField labelText="Mentee">
          <DropdownMenu
            options={AciveMenteeList}
            name="inputMenteeName"
            id="inputMenteeName"
          />
        </FormField>

        <FormField labelText="Date">
          <DateInput
            rightIconName={IconName.calendar}
            name="inputDate"
            id="inputDate"
          />
        </FormField>

        <FormField labelText="Start Time">
          <TimeInput
            name="inputActualclockInTime"
            id="inputActualclockInTime"
            rightIconName={IconName.clock}
          />
        </FormField>

        <FormField labelText="End Time">
          <TimeInput
            name="inputActualclockOutTime"
            id="inputActualclockOutTime"
            rightIconName={IconName.clock}
          />
        </FormField>

        <FormField labelText="Notes">
          <InputNotes
            placeholderText="Your notes..."
            name="inputNotes"
            id="inputNotes"
            isDisabled={false}
            notes=""
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
