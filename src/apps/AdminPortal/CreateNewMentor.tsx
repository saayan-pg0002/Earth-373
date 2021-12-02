import { DropdownMenu } from "../../components/form/DropdownMenu";
import { FormField } from "../../components/form/FormField";
import { TextInput } from "../../components/form/TextInput";
import { IconName } from "../../components/Icon";
import PageHelmet from "../../util/PageHelmet";

export const MentorTypes: string[] = [
  "IntoSchool Mentors",
  "Youth Mentors",
  "Women Mentor"
];

interface MentorInfoProp {
  mentorType: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
}

const CreateNewMentor: React.FC<MentorInfoProp> = ({
  mentorType,
  email,
  fullName,
  phoneNumber
}) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mentorType: { value: string };
      email: { value: string };
      fullName: { value: string };
      phoneNumber: { value: string };
    };

    mentorType = target.mentorType.value;
    email = target.email.value;
    fullName = target.fullName.value;
    phoneNumber = target.phoneNumber.value;
  };

  return (
    <main className="container">
      <PageHelmet title="Create New Mentor| Admin Portal | BayTree " />
      <div className="header">
        <h1 className="page-title">Create New Mentor</h1>
      </div>

      <div className="remark">
        <p>
          When you create a new mentor, the mentor will receive an email at the
          specified email below. The email contains a link to set up their
          password and start using their account.
        </p>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <FormField labelText="Mentee">
          <DropdownMenu options={MentorTypes} />
        </FormField>

        <FormField labelText="Email">
          <TextInput
            name="email"
            id="email"
            leftIconName={IconName.user}
            placeholderText="Enter mentor's email"
            initialValue={email}
            isDisabled={false}
          />
        </FormField>

        <FormField labelText="Full Name (Optional)">
          <TextInput
            name="fullName"
            id="fullname"
            leftIconName={IconName.smiley}
            placeholderText="Enter mentor's Full Name"
            isDisabled={false}
          />
        </FormField>

        <FormField labelText="phoneNumber (Optional)">
          <TextInput
            name="phoneNumber"
            id="phoneNumber"
            leftIconName={IconName.phone}
            placeholderText="Enter mentor's Phone Number"
            isDisabled={false}
          />
        </FormField>

        <div className="actions">
          <button type="button" className="btn">
            Create Mentor
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateNewMentor;
