# Mypy Cache GitHub Action

A GitHub Action for caching a mypy cache.

## Example Usage

```yaml
name: Python

on: push

jobs:
  type-check:
    name: Type Check
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Set up Python 3.6
        uses: actions/setup-python@v2
        with:
          python-version: 3.6

      - name: Cache pip packages
        uses: actions/cache@v2
        env:
          cache-name: pip-packages-cache
        with:
          path: ~/.cache/pip
          key: ${{ env.cache-name }}-type-check-${{ hashFiles('requirements/frozen/frozen_type_check_requirements.txt') }}
          restore-keys: |
            ${{ env.cache-name }}-type-check-
            ${{ env.cache-name }}-

      - name: Cache mypy cache
        uses: AustinScola/mypy-cache-github-action@v1

      - name: Type Check with mypy
        run: ./scripts/type_check.sh
```
