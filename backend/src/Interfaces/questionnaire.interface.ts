import mongoose, { Document } from "mongoose";

export default interface QuestionnaireInterface extends Document {
    questionnaire_template_id: mongoose.Schema.Types.ObjectId;
    values: [{
        field_id: Number;
        value: String;
    }]
}
