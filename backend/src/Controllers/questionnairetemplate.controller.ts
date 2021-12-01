import { Request, Response } from "express";
import { AxiosResponse } from "axios";
import QuestionnaireT from "../Models/questionnairetemplate.model";
import { FieldType } from "../Models/questionnairetemplate.model";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
import { errorHandler } from "../util";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getQuestionnaireTemplateList = async (req: Request, res: Response) => {
  try {
    const questionnaireTemplates: AxiosResponse<never> | any =
      await QuestionnaireT.find({}, { name: true }).exec();
    return res.json(questionnaireTemplates);
  } catch (error) {
    return res.status(400).json({
      function: "getQuestionnaireTemplateList",
      error: errorHandler(error)
    });
  }
};

const getQuestionnaireTemplateById = async (req: Request, res: Response) => {
  try {
    const mongo_questionnaireTemplate_id: string = req.params.id;
    const questionnaireTemplate: AxiosResponse<never> | any =
      await QuestionnaireT.findById(mongo_questionnaireTemplate_id).exec();
    if (!questionnaireTemplate) {
      return res
        .status(404)
        .json({ error: "Questionnaire Template does not exists!" });
    }
    return res.json(questionnaireTemplate);
  } catch (error) {
    return res.status(400);
  }
};

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
      password: process.env.VIEW_PASSWORD as string
    },
    responseType: "json",
    transformResponse: [(v) => v]
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
    let fieldtype: string = viewsQues["inputType"];
    if (!Object.values(FieldType).includes(<any>fieldtype)) {
      fieldtype = "other";
    }
    if (viewsQues["enabled"] == "1") {
      let oneField = {
        views_id: viewsQues["QuestionID"],
        label: viewsQues["Question"],
        is_required: false,
        field_type: fieldtype,
        validation: viewsQues["validation"].split("|"),
        options: await getOptions(Number(viewsQues["valueListID"]))
      };
      oneField.is_required = oneField.validation.includes("required");
      if (oneField.validation[0] == "") {
        oneField.validation = [];
      }
      allQues.push(oneField);
    }
  }

  return allQues;
};

async function getOptions(valuelist: Number) {
  if (valuelist == 0) {
    return [];
  }
  const url: string =
    "https://app.viewsapp.net/api/restful/admin/valuelists/" + valuelist;
  let result = "";
  await axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string
    },
    responseType: "json",
    transformResponse: [(v) => v]
  })
    .then((response) => {
      result = JSON.parse(response.data);
    })
    .catch((error) => {
      result = error;
    });
  let arrayOptions: Array<string> = [];
  const jsonOptions = <any>result[<any>"items"];
  for (const opt in jsonOptions) {
    arrayOptions.push(String(jsonOptions[opt]));
  }
  return arrayOptions;
}

const getQuestionnaireTemplate = async () => {
  const url: string =
    "https://app.viewsapp.net/api/restful/evidence/questionnaires/search";
  let result: string = "";
  await axios({
    method: "get",
    url: url,
    auth: {
      username: process.env.VIEW_USERNAME as string,
      password: process.env.VIEW_PASSWORD as string
    },
    responseType: "json",
    transformResponse: [(v) => v]
  })
    .then((response) => {
      result = JSON.parse(response.data);
    })
    .catch((error) => {
      result = error;
    });
  try {
    await createTemplateDB(result);
  } catch (error) {
    return error;
  }
};

async function createTemplateDB(data: any) {
  for (const key1 in data) {
    const quesTemplate = data[key1];
    for (const key2 in quesTemplate) {
      const qTFields = quesTemplate[key2];
      await QuestionnaireT.find({
        views_id: Number(qTFields["QuestionnaireID"])
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
                views_id: Number(qTFields["QuestionnaireID"]),
                fields: questionfields
              });
              await newQTemplate
                .save()
                .then(() => {
                  console.log(
                    `Questionnaire Template ${newQTemplate.views_id} added`
                  );
                })
                .catch((error) => {
                  console.log(
                    `Error adding template ${newQTemplate.views_id}`,
                    error
                  );
                  return error;
                });
            } else {
              console.log(
                `Questionnaire Template ${qTFields["QuestionnaireID"]} has no questions, not adding...`
              );
            }
          } else {
            console.log("Questionnaire Template already exists");
          }
        });
    }
  }
}

const migrateQuestionnarieTemplate = async (req: Request, res: Response) => {
  try {
    await getQuestionnaireTemplate();
    res.status(200).send("Added templates successfully");
  } catch (error) {
    throw error;
  }
};

const QuestionnaireController = {
  migrateQuestionnarieTemplate,
  getQuestionnaireTemplateList,
  getQuestionnaireTemplateById
};
export default QuestionnaireController;
