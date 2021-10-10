import request from "supertest";
import app from "../src/app";

import "mocha";

describe("GET /", () => {
  it("Returns an error message", (done) => {
    request(app).get("/").expect({ message: "Not found" }, done);
  });
});
