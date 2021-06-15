import * as core from "@actions/core";
import * as cache from "@actions/cache";
import * as github from "@actions/github";

async function save(): Promise<void> {
  try {
    core.debug("Saving mypy cache...");

    const paths: string[] = [".mypy_cache"];

    const keyPrefix = "mypy-cache-";
    const key = keyPrefix + github.context.sha;

    await cache.saveCache(paths, key);
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (!module.parent) {
  save();
}

export {save};
