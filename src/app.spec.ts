import test from "ava";
import * as request from "supertest";
process.env.RUN_TYPE = '2'
import { koalaServer } from "./app";

test.afterEach(() => { koalaServer.close(); });

test("Serwer return 200 status", async t => {
    const response = await request(koalaServer).get("/");
    t.is(response.status, 200);
});
