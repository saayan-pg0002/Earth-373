import { Request, Response } from "express";
import mongoose from "mongoose";
import QuestionnaireT from "../Models/questionnairetemplate.model";
import { FieldType } from "../Models/questionnairetemplate.model";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import _ from "lodash";
import Association from "../Models/association.model";
import Questionnaire from "../Models/questionnaire.model";
import User from "../Models/user.model";
import xml2js from "xml2js";

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
        id: viewsQues["QuestionID"],
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

const assignQuestionnaireToAssociation = async (
  req: Request,
  res: Response
) => {
  const association_id: string = req.params.assid;
  const template_id: string = req.params.tempid;
  const builder = new xml2js.Builder();

  Association.findOne({ _id: association_id })
    .exec()
    .then((assoc) => {
      const user_id: mongoose.Types.ObjectId | undefined = assoc?.mentor_id;

      User.findOne({ _id: user_id })
        .exec()
        .then((user_profile) => {
          const user_views_id: String | undefined = user_profile?.views_id;

          let resBody = {
            answers: {
              EntityType: "Person",
              EntityID: user_views_id
            }
          };

          const xmlInput = builder.buildObject(resBody);

          axios({
            method: "post",
            url:
              "https://app.viewsapp.net/api/restful/evidence/questionnaires/" +
              template_id +
              "/answers",
            auth: {
              username: process.env.VIEW_USERNAME as string,
              password: process.env.VIEW_PASSWORD as string
            },
            data: xmlInput,
            headers: {
              "Content-Type": "text/xml",
              Accept: "text/xml"
            },
            responseType: "json",
            transformResponse: [(v) => v]
          }).then((resultFromAPI) => {
            xml2js.parseString(resultFromAPI.data, (err, result) => {
              if (err) {
                return res.status(500).json({
                  message:
                    "Error in parsing XML from response to JSON, coming from the Views API",
                  err
                });
              }

              const val: any = Object.values(result.answerset)[0];
              const val_id = val.id;

              Questionnaire.create(
                {
                  mentor_views_id: user_views_id,
                  questionnaire_template_views_id: template_id,
                  questionnaire_views_id: val_id
                },
                (err, new_questionnaire) => {
                  if (err) {
                    return res.status(500).json({
                      message: "Error in creating a questionnaire object",
                      err
                    });
                  }

                  Association.findOneAndUpdate(
                    {
                      _id: association_id
                    },
                    { questionnaire_id: val_id },
                    { new: true }
                  )
                    .exec()
                    .then(() => {
                      const val = resultFromAPI.data;
                      res.type("text/xml");
                      return res.status(200).send({
                        val
                      });
                    })
                    .catch((e) => {
                      return res.status(500).json({
                        message: "Failed to update association object",
                        e
                      });
                    });
                }
              );
            });
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Error in finding the mentor profile of the association",
            err
          });
        });
    });
};

const updateQuestionnaireValues = async (req: Request, res: Response) => {
  const answer = req.body;
  const questionnaire_id: string = req.params.id;
  const builder = new xml2js.Builder();

  //Find template ID of questionnaire (we need it for some reason, according to Views API...)
  Questionnaire.findOne({ questionnaire_views_id: questionnaire_id })
    .exec()
    .then((questionnaire) => {
      const template_id = questionnaire?.questionnaire_template_views_id;
      const mentor_id = questionnaire?.mentor_views_id;

      let resBody = {
        answers: {
          EntityType: "Person",
          EntityID: mentor_id,
          answer: answer
        }
      };

      const xmlInput = builder.buildObject(resBody);

      axios({
        method: "put",
        url:
          "https://app.viewsapp.net/api/restful/evidence/questionnaires/" +
          template_id +
          "/answers/" +
          questionnaire_id,
        auth: {
          username: process.env.VIEW_USERNAME as string,
          password: process.env.VIEW_PASSWORD as string
        },
        data: xmlInput,
        headers: {
          "Content-Type": "text/xml",
          Accept: "text/xml"
        },
        responseType: "json",
        transformResponse: [(v) => v]
      })
        .then((result) => {
          const val = result.data;
          res.type("text/xml");
          return res.status(200).send({
            message: "Successfully updated questionnaire values",
            val
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: "Error in sending axios request",
            err
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "",
        err
      });
    });
};

const QuestionnaireController = {
  migrateQuestionnarieTemplate,
  assignQuestionnaireToAssociation,
  updateQuestionnaireValues
};
export default QuestionnaireController;
