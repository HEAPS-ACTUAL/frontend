const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const path = require("path");

chai.use(chaiHttp);
const expect = chai.expect;
const url = "http://localhost:3000"; // Adjust if your server is hosted differently

describe("PDF Upload and Question Generation Test", () => {
  it("should upload a PDF file and return questions", (done) => {
    chai
      .request(url)
      .post("/upload")
      .type("form")
      .attach(
        "file",
        fs.readFileSync("path/to/your/testfile.pdf"),
        "testfile.pdf"
      )
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.questions).to.be.a("string");
        done();
      });
  });

  it("should return 400 if no file is uploaded", (done) => {
    chai
      .request(url)
      .post("/upload")
      .type("form")
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.text).to.equal("No file uploaded");
        done();
      });
  });
});
