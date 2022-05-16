import { agent as _request, SuperAgentTest } from "supertest";
import { Server } from "http";
import { quizServer } from "../../src/quiz_server";

let agent: SuperAgentTest;
let server: Server;

describe("quizzez routes", () => {
  beforeEach((done) => {
    server = new quizServer().get().listen(4000, () => {
      agent = _request(server);
      done();
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  it("Should return 0 quizzes", async () => {
    const { body: data } = await agent.get("/quiz").expect(200);
    expect(data?.length).toEqual(0);
  });
});
