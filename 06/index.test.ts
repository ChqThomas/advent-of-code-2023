import { expect, test } from "bun:test";
import { getPossibleWinsCount } from ".";

test("getPossibleWinsCount", () => {
    expect(getPossibleWinsCount({ time: 7, distance: 9})).toBe(4);
    expect(getPossibleWinsCount({ time: 15, distance: 40})).toBe(8);
    expect(getPossibleWinsCount({ time: 30, distance: 200})).toBe(9);
})