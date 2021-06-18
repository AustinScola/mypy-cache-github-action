import * as cache from "@actions/cache";
import * as core from "@actions/core";
import {State} from "../src/state";

test("restore with cache miss", async () => {
  jest.spyOn(cache, "restoreCache").mockResolvedValue(undefined);

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

  jest.spyOn(core, "saveState").mockImplementation(() => {});

  const restore = require("../src/restore").restore;

  await restore();

  expect(cache.restoreCache).toHaveBeenCalledTimes(1);

  const expectedPaths = [".mypy_cache"];
  const expectedKey = "mypy-cache-086ffe45156e33a337859ff77cd720cdc1e9cb40";
  const expectedRestoreKeys = ["mypy-cache-"];
  const expectedRestoreCacheArgs = [
    expectedPaths,
    expectedKey,
    expectedRestoreKeys,
  ];
  expect(cache.restoreCache).toHaveBeenCalledWith(...expectedRestoreCacheArgs);

  expect(core.saveState).toHaveBeenCalledWith(State.exactMatch, false);
});

test("restore with a restoration key", async () => {
  const restoredCacheKey =
    "mypy-cache-6e6d4656b4930895a4527fed21f3f1db0699c1f9";
  jest.spyOn(cache, "restoreCache").mockResolvedValue(restoredCacheKey);

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

  jest.spyOn(core, "saveState").mockImplementation(() => {});

  const restore = require("../src/restore").restore;

  await restore();

  expect(cache.restoreCache).toHaveBeenCalledTimes(1);

  const expectedPaths = [".mypy_cache"];
  const expectedKey = "mypy-cache-086ffe45156e33a337859ff77cd720cdc1e9cb40";
  const expectedRestoreKeys = ["mypy-cache-"];
  const expectedRestoreCacheArgs = [
    expectedPaths,
    expectedKey,
    expectedRestoreKeys,
  ];
  expect(cache.restoreCache).toHaveBeenCalledWith(...expectedRestoreCacheArgs);

  expect(core.saveState).toHaveBeenCalledWith(State.exactMatch, false);
});

test("restore with exact key match", async () => {
  const restoredCacheKey =
    "mypy-cache-086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.spyOn(cache, "restoreCache").mockResolvedValue(restoredCacheKey);

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

  jest.spyOn(core, "saveState").mockImplementation(() => {});

  const restore = require("../src/restore").restore;

  await restore();

  expect(cache.restoreCache).toHaveBeenCalledTimes(1);

  const expectedPaths = [".mypy_cache"];
  const expectedKey = "mypy-cache-086ffe45156e33a337859ff77cd720cdc1e9cb40";
  const expectedRestoreKeys = ["mypy-cache-"];
  const expectedRestoreCacheArgs = [
    expectedPaths,
    expectedKey,
    expectedRestoreKeys,
  ];
  expect(cache.restoreCache).toHaveBeenCalledWith(...expectedRestoreCacheArgs);

  expect(core.saveState).toHaveBeenCalledWith(State.exactMatch, true);
});
