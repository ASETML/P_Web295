//Tests de helper.mjs
import { success } from "../routes/helper.mjs";
import { expect, test } from "vitest";

test("sucess", () => {
  expect(success("Test", { testData: "Data" })).toMatchObject({
    message: "Test",
    data: { testData: "Data" },
  });
});

test("sucess", () => {
  expect(success("}", { data: "Data" })).toMatchObject({
    message: "}",
    data: { data: "Data" },
  });
});

test("sucess", () => {
  expect(success("Test", { àéà: "Data" })).toMatchObject({
    message: "Test",
    data: { àéà: "Data" },
  });
});

test("sucess", () => {
  expect(success("'", { data: "Data" })).toMatchObject({
    message: "'",
    data: { data: "Data" },
  });
});

test("sucess", () => {
  expect(success("Test", { data: "§" })).toMatchObject({
    message: "Test",
    data: { data: "§" },
  });
});

test("sucess", () => {
  expect(success("-", { data: "Data" })).toMatchObject({
    message: "-",
    data: { data: "Data" },
  });
});

test("sucess", () => {
  expect(success("Emoji", { testData: "👨‍💻" })).toMatchObject({
    message: "Emoji",
    data: { testData: "👨‍💻" },
  });
});
