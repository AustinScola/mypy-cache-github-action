import * as cache from "@actions/cache";

test("restores the mypy cache", async () => {
  jest.spyOn(cache, "restoreCache").mockResolvedValue(undefined);

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

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
});
