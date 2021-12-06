import request from "supertest";
import { Console } from "console";
import app from "../app";
import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import QuestionnaireTemplate from "../Models/questionnairetemplate.model";

chai.should();
chai.use(chaiHttp);

describe("GET /questionnaires-template", () => {
  const logindetails = {
    email: "email@hotmail.com",
    password: "admin123"
  };
  let jwttoken = "";

  it("Connect DB and get JWT Token ", (done) => {
    chai
      .request(app)
      .post("/users/login")
      .send(logindetails)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.have.property("jwt");
        jwttoken = "bearer " + response.body.jwt;
        done();
      });
  }).timeout(5000);

  it("GET /migrate-questionnaires", (done) => {
    chai
      .request(app)
      .get("/questionnaires/migrate-questionnaires")
      .set("Authorization", jwttoken)
      .end(async (err, response) => {
        response.should.have.status(200);

        //CHECKING DUPLICATE VALUES ADDED TO DB BECAUSE OF THREADING ISSUE
        //CHECKING duplicate views_id
        let duplicateRecords = await QuestionnaireTemplate.aggregate([
          {
            $group: {
              _id: "$views_id",
              views_id: { $first: "$views_id" },
              count: { $sum: 1 }
            }
          },
          { $match: { count: { $gt: 1 } } },
          { $project: { views_id: 1, _id: 0 } },
          { $group: { _id: null, views_id_dup: { $push: "$views_id" } } },
          { $project: { _id: 0, views_id_dup: 1 } }
        ]);
        duplicateRecords.length.should.eq(0);

        //Checking random record's field types incase someone makes changes in future
        let temp = await QuestionnaireTemplate.find({}, { _id: true }).exec();
        let randId = temp[Math.floor(Math.random() * (22 - 0 + 1) + 0)];
        let randomRecord = await QuestionnaireTemplate.findById(randId);
        randomRecord?.name.should.be.a("string");
        randomRecord?.fields.should.be.a("array");
        randomRecord?.views_id.should.be.a("number");
        randomRecord?.fields[0].options.should.be.a("array");
        randomRecord?.fields[0].label.should.be.a("string");
        randomRecord?.fields[0].is_required.should.be.a("boolean");
        randomRecord?.fields[0].validation.should.be.a("array");
        randomRecord?.fields[0].field_type.should.be.a("string");
        done();
      });
  }).timeout(100000);
});
