![Unit Tests](https://github.com/tradingeconomics/tradingeconomics-js/actions/workflows/tests.yml/badge.svg)

# Tests

## Overview

Tests are split into two categories:

| Type | Location | API key required |
|---|---|---|
| **Unit** | `tests/unit/` | No |
| **Integration** | `tests/*.test.js` | Yes |

Integration tests make real HTTP calls to `api.tradingeconomics.com`. Each test:
1. Calls a `tradingeconomics` package method
2. Makes the equivalent direct HTTP request to the API
3. Compares both responses with `expect(a).toEqual(c)`

> **Note:** The API may temporarily rate-limit requests during test runs.

---

## Running tests

### Unit tests (no API key needed)

```cmd
npm test
```

---

### Integration tests

Integration tests require a valid Trading Economics API key. Set the `TE_API_KEY` environment variable before running.

**Step 1 — set your key in the terminal session:**

```cmd
set TE_API_KEY=your_key:your_secret
```

**Step 2 — run integration tests:**

```cmd
npm run test:integration
```

If `TE_API_KEY` is not set, all integration test suites are **skipped** (not failed).

---

### Run a specific integration test file

```cmd
set TE_API_KEY=your_key:your_secret
npx jest tests/calendar.test.js
```

---

### Run everything (unit + integration)

```cmd
set TE_API_KEY=your_key:your_secret
npm run test:all
```

---

## npm scripts

| Script | What it runs |
|---|---|
| `npm test` | Unit tests only (no API key needed) |
| `npm run test:integration` | Integration tests (requires `TE_API_KEY`) |
| `npm run test:all` | All tests (requires `TE_API_KEY`) |
