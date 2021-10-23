import { Document } from "mongoose";

export default interface QuestionnaireInterface extends Document {
    mentee_profile_id: String;
    questionnaire_template_id: String;
}
