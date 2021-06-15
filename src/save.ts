import * as core from "@actions/core";

async function save(): Promise<void> {
  try {
    core.debug("Saving mypy cache...");
  } catch (error) {
    core.setFailed(error.message);
  }
}

save();

export {save};
