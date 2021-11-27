import React from "react";
import { DropdownMenu } from "../form/DropdownMenu";
import { FormField } from "../form/FormField";
import Link from "../Link";
import PageHelmet from "../../util/PageHelmet";
import { Paths } from "../../util/routes";

const QuestionnaireType: string[] = ["IntoSchool Mentors", "Youth Mentors"];

const NewQuestionnaire: React.FC<{}> = () => {
  return (
    <main className="container">
      <PageHelmet title="New Questionnaire" />

      <div className="header">
        <h1 className="page-title">New Questionnaire</h1>
        <Link to={Paths.menteeProfileQuestionnaires} className="back-btn">
          Go Back
        </Link>
      </div>

      <form className="form">
        <FormField labelText="Questionnaire type">
          <DropdownMenu options={QuestionnaireType} />
        </FormField>

        <div className="actions">
          <button type="button" className="btn">
            Choose Questionnaire
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewQuestionnaire;
