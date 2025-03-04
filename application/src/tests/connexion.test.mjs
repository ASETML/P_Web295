import { test, beforeEach, afterEach } from "vitest";
import { app } from "../app.mjs";

import request from "supertest";

let server;

beforeEach(() => {
  server = app.listen();
});

afterEach(() => {
  server.close();
});

test("GET /api/connexion", async ({ expect }) => {
  const response = await request(server).get("/api/products");

  expect(response.statusCode).toBe(200);
  server.close();
});
