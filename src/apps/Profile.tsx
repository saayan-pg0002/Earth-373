import PageHelmet from "../util/PageHelmet";
import { FormField } from "../components/form/FormField";
import { IconName } from "../components/Icon";
import { TextInput } from "../components/form/TextInput";
import Link from "../components/Link";
import { Paths } from "../util/routes";
import { FC, useState, useEffect } from "react";
import { Endpoints, RequestType, sendRequest } from "../util/request";
import { MessageToastType, showMessageToast } from "../components/MessageToast";

const Profile: FC<{}> = () => {
  const [activityStatus, setActivityStatus] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    sendRequest(RequestType.GET, Endpoints.me)
      .then(({ data }) => {
        const { activity_status, email, first_name, last_name, phone_number } =
          data;

        setActivityStatus(activity_status);
        setEmail(email);
        setName(`${first_name} ${last_name}`);
        setPhoneNumber(phone_number);
      })
      .catch((err) =>
        showMessageToast(MessageToastType.ERROR, "Unable to load profile")
      );
  }, []);

  return (
    <main className="profile">
      <PageHelmet title="Profile" />

      <div className="container">
        <div className="header">
          <h1 className="page-title">Profile</h1>
          <Link to={Paths.settings} className="back-btn">
            Go Back
          </Link>
        </div>
        <form className="form">
          <p className="subtext">
            This is a view-only page. To change any fields, please contact an
            admin
          </p>
          {activityStatus && (
            <FormField labelText="Activity Status">
              <TextInput
                leftIconName={IconName.circledCheckMark}
                placeholderText="Activity Status"
                initialValue={activityStatus}
                isDisabled={true}
              ></TextInput>
            </FormField>
          )}
          {email && (
            <FormField labelText="Email">
              <TextInput
                leftIconName={IconName.user}
                placeholderText="Email"
                initialValue={email}
                isDisabled={true}
              ></TextInput>
            </FormField>
          )}
          {name && (
            <FormField labelText="Name">
              <TextInput
                placeholderText="Name"
                leftIconName={IconName.smiley}
                initialValue={name}
                isDisabled={true}
              ></TextInput>
            </FormField>
          )}
          {phoneNumber && (
            <FormField labelText="Phone Number">
              <TextInput
                placeholderText="Phone Number"
                leftIconName={IconName.phone}
                initialValue={phoneNumber}
                isDisabled={true}
              ></TextInput>
            </FormField>
          )}
        </form>
      </div>
    </main>
  );
};

export default Profile;
