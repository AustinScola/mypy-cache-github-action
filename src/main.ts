import * as core from '@actions/core'

async function main(): Promise<void> {
  try {
    core.debug('Checking for cached mypy cache...')
  } catch (error) {
    core.setFailed(error.message)
  }
}

main()

export {main}
