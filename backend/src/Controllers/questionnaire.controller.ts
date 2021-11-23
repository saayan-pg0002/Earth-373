import { Request, Response, Router } from "express";
import QuestionnaireT from "../Models/questionnairetemplate.model";
import { FieldType } from "../Models/questionnairetemplate.model";
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
    if (!Object.values(FieldType).includes(viewsQues["inputType"])) {
      console.log(viewsQues["inputType"]);
    }
    if (viewsQues["enabled"] == "1") {
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
  try {
    await createQTemplates(result);
  } catch (error) {
    return error;
  }
};

async function createQTemplates(data: any) {
  for (const key1 in data) {
    const quesTemplate = data[key1];
    for (const key2 in quesTemplate) {
      const qTFields = quesTemplate[key2];
      await QuestionnaireT.find({
        id: Number(qTFields["QuestionnaireID"]),
      })
        .exec()
        .then(async (qTemp) => {
          if (qTemp.length === 0) {
            const questionfields = await getQuestions(
              Number(qTFields["QuestionnaireID"])
            );
            if (questionfields.length > 0) {
              const newQTemplate = new QuestionnaireT({
                name: String(qTFields["Title"]),
                id: Number(qTFields["QuestionnaireID"]),
                fields: questionfields,
              });
              await newQTemplate
                .save()
                .then(() => {
                  console.log(`Template ${newQTemplate.id} added`);
                })
                .catch((error) => {
                  console.log(`Error adding template ${newQTemplate.id}`);
                  return error;
                });
            } else {
              console.log(
                `QTemplate ${qTFields["QuestionnaireID"]} has no ques.`
              );
            }
          } else {
            console.log("Template already exists");
          }
        });
    }
  }
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
