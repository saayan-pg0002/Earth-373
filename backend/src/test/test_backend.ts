import request from "supertest";
import app from "../app";

import "mocha";

describe("GET /", () => {
  it("Returns an error message", (done) => {
    request(app).get("/").expect({ message: "Not found" }, done);
  });
});
