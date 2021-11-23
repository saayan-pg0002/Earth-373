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
  createQuestions(result);
  return result;
};

async function createQuestions(data: any) {
  for (const key in data) {
    const viewsQues = data[key];
    console.log({
      id: viewsQues["QuestionID"],
      question: viewsQues["Question"],
      label: viewsQues["Question"],
      is_required: viewsQues["validation"] !== "",
      field_type: viewsQues["inputType"],
      enabled: viewsQues["enabled"],
    });
  }
}

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
  await getQuestions(30);
  return result;
};

async function createTemplates(data: any) {
  for (const key in data) {
    const viewsQT = data[key];
    for (const key1 in viewsQT) {
      const qTfields = viewsQT[key1];
    }
  }
}
const migrateQuestionnarie = async (req: Request, res: Response) => {
  try {
    const qT: any = await getQuestionnaireTemplates();
    res.status(200).send(qT);
  } catch (error) {
    throw error;
  }
};

const QuestionnaireController = {
  migrateQuestionnarie,
};
export default QuestionnaireController;
