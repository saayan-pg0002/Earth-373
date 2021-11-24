import request from "supertest";
import { expect } from "chai";
import app from "../app";

import "mocha";

describe("POST /users/login", function () {
  this.timeout(10000);
  it("Successfully logs in with account baytree.venus@yahoo.com (Status code = 200)", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "baytree.venus@yahoo.com", password: "admin123" })
      .then((res) => {
        expect(res.statusCode == 200);
        done();
      });
  });

  it("Set JWT cookie", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "baytree.venus@yahoo.com", password: "admin123" })
      .end((err, res) => {
        expect(res.headers).to.have.key("Set-Cookie");
        if (err) {
          console.log(err);
        }
        done();
      });
  });
});

describe("GET /", () => {
  it("Returns an error message", (done) => {
    request(app).get("/").expect({ message: "Not found" }, done);
  });
});

describe("GET /users/getusers", function () {
  this.timeout(2000);
  it("Returns all users from the database (Status code = 200)", (done) => {
    request(app)
      .get("/users/getusers")
      .then((res) => {
        expect(res.statusCode == 200);
        done();
      });
  });
});

describe("GET /users/view/get/:type", function () {
  this.timeout(10000);
  it("Successfully gets all participants from Views (Status code = 200)", (done) => {
    request(app)
      .get("/users/view/get/participants")
      .then((res) => {
        expect(res.statusCode == 200);
        done();
      });
  });
  it("Successfully gets all staff from Views (Status code = 200)", (done) => {
    request(app)
      .get("/users/view/get/staff")
      .then((res) => {
        expect(res.statusCode == 200);
        done();
      });
  });
  it("Successfully gets all volunteers from Views (Status code = 200)", (done) => {
    request(app)
      .get("/users/view/get/volunteers")
      .then((res) => {
        expect(res.statusCode == 200);
        done();
      });
  });
});

describe("GET /users/view/migrate", function () {
  this.timeout(20000);
  it("Migrates all users from views onto our mongodb database (Status code = 200)", (done) => {
    request(app)
      .get("/users/view/migrate")
      .then((res) => {
        expect(res.statusCode == 200);
        done();
      });
  });
});

//NOTE: the following test requires access to req.user. I dont know how to do this, at least not yet.

/*describe("POST /me/association/goals", function () {
  this.timeout(10000);
  it("Gets all goals for an association (Status code = 200)", (done) => {
    request(app)
      .post("/me/association/goals")
      .set(
        "Cookie",
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJheXRyZWUudmVudXNAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDh3bmg5LjVqQmpQTDFoVkpuSTVnLlFFRUk0N1lJZ25KL0ZDaVRBQnBoYnNHZGhURVVEbWkiLCJpYXQiOjE2MzczNTUyMzcsImV4cCI6MTYzNzM3MTYxNDU1NTM3LCJpc3MiOiJCYXlUcmVlRGV2cyJ9.eRFGbYwkv4w08T4iU380uazHfYC1bUaTfu4_W9eEK50; Path=/; Domain=localhost"
      )
      .send({ mentee_id: "14514514" })
      .then((res) => {
        console.log(res.body);
        expect(res.statusCode == 200);
        done();
      });
  });
});*/
