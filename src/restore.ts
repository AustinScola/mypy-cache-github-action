import * as core from "@actions/core";
import * as cache from "@actions/cache";
import * as github from "@actions/github";

async function restore(): Promise<void> {
  try {
    core.debug("Checking for cached mypy cache...");

    const paths: string[] = [".mypy_cache"];

    const keyPrefix = "mypy-cache-";
    const key = keyPrefix + github.context.sha;

    const restoreKeys: string[] = [keyPrefix];

    const cacheKey = await cache.restoreCache(paths, key, restoreKeys);

    const exactMatch = cacheKey === key;
    core.saveState("EXACT_MATCH", exactMatch);
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (!module.parent) {
  restore();
}

export {restore};
