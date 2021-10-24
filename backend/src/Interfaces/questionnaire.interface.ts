import mongoose, { Document } from "mongoose";

export default interface QuestionnaireInterface extends Document {
    mentee_profile_id: mongoose.Schema.Types.ObjectId;
    questionnaire_template_id: mongoose.Schema.Types.ObjectId;
}
