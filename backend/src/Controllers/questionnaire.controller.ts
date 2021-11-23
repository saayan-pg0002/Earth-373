import { Request, Response, Router } from "express";
import QuestionnaireT from "../Models/questionnairetemplate.model";
import axios from "axios";
import mongoose, { Error, Model } from "mongoose";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getQuestions = async (qTId: Number) => {
  const url: string =
    "https://app.viewsapp.net/api/restful/evidence/questionnaires/" +
    qTId +
    "/questions";
  let result: string = "";
  await axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    responseType: "json",
    transformResponse: [(v) => v],
  })
    .then((response) => {
      result = JSON.parse(response.data);
    })
    .catch((error) => {
      result = error;
    });

  let allQues = [];
  for (const key1 in result as any) {
    const viewsQues: any = result[key1 as any];
    if (viewsQues["enabled"] === "1") {
      let oneField = {
        id: viewsQues["QuestionID"],
        label: viewsQues["Question"],
        is_required: viewsQues["validation"] !== "",
        field_type: viewsQues["inputType"],
      };
      allQues.push(oneField);
    }
  }
  return allQues;
};

const getQuestionnaireTemplates = async () => {
  const url: string =
    "https://app.viewsapp.net/api/restful/evidence/questionnaires/search";
  let result: string = "";
  await axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string,
    },
    responseType: "json",
    transformResponse: [(v) => v],
  })
    .then((response) => {
      result = JSON.parse(response.data);
    })
    .catch((error) => {
      result = error;
    });
  await createQTemplates(result);
};

async function createQTemplates(data: any) {
  const questionfields = await getQuestions(30);
  const newQTemplate = new QuestionnaireT({
    name: "Test Questionnaire" as string,
    id: 30 as Number,
    fields: questionfields,
  });
  newQTemplate.save().catch((error) => {
    return console.log("Error adding template", error);
  });
  return console.log(`Added template ${newQTemplate.id}`);
}

const migrateQuestionnarie = async (req: Request, res: Response) => {
  try {
    await getQuestionnaireTemplates();
    res.status(200).send("Added templates successfully");
  } catch (error) {
    throw error;
  }
};

const QuestionnaireController = {
  migrateQuestionnarie,
};
export default QuestionnaireController;
