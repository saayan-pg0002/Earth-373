import {
  DropdownMenu,
  DropdownMenuOptionsProps
} from "../../../components/form/DropdownMenu";
import { FormField } from "../../../components/form/FormField";
import { TextInput } from "../../../components/form/TextInput";
import { IconName } from "../../../components/Icon";
import PageHelmet from "../../../util/PageHelmet";

const MentorTypes: DropdownMenuOptionsProps[] = [
  { label: "IntoSchool Mentors", value: "into-school" },
  { label: "Youth Mentors", value: "youth" },
  { label: "Women Mentor", value: "women" }
];

interface MentorInfoProp {
  mentorType: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

const CreateNewMentor: React.FC<MentorInfoProp> = ({
  mentorType,
  email,
  firstName,
  lastName,
  phoneNumber
}) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      mentorType: { value: string };
      email: { value: string };
      firstName: { value: string };
      lastName: { value: string };
      phoneNumber: { value: string };
    };

    mentorType = target.mentorType.value;
    email = target.email.value;
    firstName = target.firstName.value;
    lastName = target.lastName.value;
    phoneNumber = target.phoneNumber.value;
  };

  return (
    <main className="container">
      <PageHelmet title="Create New Mentor" isAdminPortal="true" />
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
            placeholderText="Email"
            initialValue={email}
            isDisabled={false}
          />
        </FormField>

        <FormField labelText="First Name">
          <TextInput
            name="firstName"
            id="firstname"
            leftIconName={IconName.smiley}
            placeholderText="First Name"
            isDisabled={false}
          />
        </FormField>

        <FormField labelText="Last Name">
          <TextInput
            name="lastName"
            id="lastname"
            leftIconName={IconName.smiley}
            placeholderText="last Name"
            isDisabled={false}
          />
        </FormField>

        <FormField labelText="phoneNumber (Optional)">
          <TextInput
            name="phoneNumber"
            id="phoneNumber"
            leftIconName={IconName.phone}
            placeholderText="Phone Number"
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
