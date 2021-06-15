import * as core from "@actions/core";

async function restore(): Promise<void> {
  try {
    core.debug("Checking for cached mypy cache...");
  } catch (error) {
    core.setFailed(error.message);
  }
}

restore();

export {restore};
