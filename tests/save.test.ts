import * as cache from "@actions/cache";

test("saves the mypy cache", async () => {
  const cacheIdMock = 12345;
  jest.spyOn(cache, "saveCache").mockResolvedValue(cacheIdMock);

  const mockSHA = "086ffe45156e33a337859ff77cd720cdc1e9cb40";
  jest.doMock("@actions/github", () => ({
    __esModule: true,
    context: {sha: mockSHA},
  }));

  const save = require("../src/save").save;

  await save();

  expect(cache.saveCache).toHaveBeenCalledTimes(1);

  const expectedPaths = [".mypy_cache"];
  const expectedKey = "mypy-cache-086ffe45156e33a337859ff77cd720cdc1e9cb40";
  const expectedSaveCacheArgs = [expectedPaths, expectedKey];
  expect(cache.saveCache).toHaveBeenCalledWith(...expectedSaveCacheArgs);
});
