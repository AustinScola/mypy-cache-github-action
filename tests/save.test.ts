import * as cache from "@actions/cache";
import * as core from "@actions/core";
import {State} from "../src/state";

test("saves the mypy cache if there was not an exact match", async () => {
  const cacheIdMock = 12345;
  jest.spyOn(cache, "saveCache").mockResolvedValue(cacheIdMock);

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

  const mockState = new Map([[State.exactMatch as string, "false"]]);
  jest.spyOn(core, "getState").mockImplementation((name: string) => {
    const value = mockState.get(name);
    if (value === undefined) {
      throw `No value in state for name "${name}"`;
    }
    return value;
  });

  const save = require("../src/save").save;

  await save();

  expect(cache.saveCache).toHaveBeenCalledTimes(1);

  const expectedPaths = [".mypy_cache"];
  const expectedKey = "mypy-cache-086ffe45156e33a337859ff77cd720cdc1e9cb40";
  const expectedSaveCacheArgs = [expectedPaths, expectedKey];
  expect(cache.saveCache).toHaveBeenCalledWith(...expectedSaveCacheArgs);
});

test("does not save the mypy cache if there was not an exact match", async () => {
  const cacheIdMock = 12345;
  jest.spyOn(cache, "saveCache").mockResolvedValue(cacheIdMock);

  const mockState = new Map([[State.exactMatch as string, "true"]]);
  jest.spyOn(core, "getState").mockImplementation((name: string) => {
    const value = mockState.get(name);
    if (value === undefined) {
      throw `No value in state for name "${name}"`;
    }
    return value;
  });

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

  const save = require("../src/save").save;

  await save();

  expect(cache.saveCache).toHaveBeenCalledTimes(0);
});
