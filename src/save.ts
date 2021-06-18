import * as core from "@actions/core";
import * as cache from "@actions/cache";
import * as github from "@actions/github";
import {State} from "./state";

async function save(): Promise<void> {
  try {
    core.debug("Maybe saving mypy cache...");

    const paths: string[] = [".mypy_cache"];

    const keyPrefix = "mypy-cache-";
    const key = keyPrefix + github.context.sha;

    const exactMatch = core.getState(State.exactMatch);
    if (exactMatch === "false") {
      await cache.saveCache(paths, key);
    } else {
      core.info(
        "Not saving the mypy cache because it was restored exactly for this commit."
      );
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (!module.parent) {
  save();
}

export {save};
