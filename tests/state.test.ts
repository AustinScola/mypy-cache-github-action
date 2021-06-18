import {State} from "../src/state";

test("state exact match", () => {
  expect(State.exactMatch).toBe("EXACT_MATCH");
});
