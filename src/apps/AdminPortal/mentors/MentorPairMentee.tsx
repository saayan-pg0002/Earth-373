import { DateInput } from "../../../components/form/DateInput";
import {
  DropdownMenu,
  DropdownMenuOptionsProps
} from "../../../components/form/DropdownMenu";
import { FormField } from "../../../components/form/FormField";
import PageHelmet from "../../../util/PageHelmet";
import { Paths, routeTo } from "../../../util/routes";

const ListOfMenteesUnpairedWithMentee: DropdownMenuOptionsProps[] = [
  { label: "Gilda Aindrea", value: "1" },
  { label: "Danial Chinatsu", value: "2" },
  { label: "Brianne Thorley", value: "3" }
];
interface PairMenteeProp {
  mentee: string;
  startDate: Date;
  endDate?: Date;
}
const MentorPairMentee: React.FC<PairMenteeProp> = ({
  mentee,
  startDate,
  endDate
}) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mentee: { value: string };
      startDate: { value: Date };
      endDate: { value: Date };
    };

    mentee = target.mentee.value;
    startDate = target.startDate.value;
    endDate = target.endDate.value;

    routeTo(Paths.mentorsDetails);
  };

  return (
    <main className="container">
      <PageHelmet title="Pair New Mentee" isAdminPortal="true" />
      <div className="header">
        <h1 className="page-title">Pair Mentee</h1>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <FormField labelText="Mentee">
          <DropdownMenu
            name="mentee"
            options={ListOfMenteesUnpairedWithMentee}
          />
        </FormField>

        <FormField labelText="Start Date">
          <DateInput name="startDate" id="inputDate" isDisabled={false} />
        </FormField>

        <FormField labelText="End Date">
          <DateInput name="endDate" id="inputDate" isDisabled={false} />
        </FormField>

        <div className="actions">
          <button type="submit" className="btn">
            Pair Mentee
          </button>
        </div>
      </form>
    </main>
  );
};

export default MentorPairMentee;
