import { expect, test } from "bun:test";
import { getKind, parseInput, compareHands, getTotal, compareCards } from ".";

const testInput =`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

const testHands = parseInput(testInput);


test("getKind", () => {
    expect(getKind(testHands[0])).toBe("onePair");
    expect(getKind(testHands[1])).toBe("threeOfAKind");
    expect(getKind(testHands[2])).toBe("twoPair");
    expect(getKind(testHands[3])).toBe("twoPair");
    expect(getKind(testHands[4])).toBe("threeOfAKind");
})

test('compareHands', () => {

    const sorted = testHands.sort((a, b) => compareHands(a, b, getKind, compareCards));

    expect(sorted[0].hand).toBe("QQQJA");
    expect(sorted[1].hand).toBe("T55J5");
    expect(sorted[2].hand).toBe("KK677");
    expect(sorted[3].hand).toBe("KTJJT");
    expect(sorted[4].hand).toBe("32T3K");
})


test('compareCards', () => {

    const testInput = `77773 74
77797 948
7777J 353
77776 930`

    const testHands = parseInput(testInput);
    const sorted = testHands.sort((a, b) => compareHands(a, b, getKind, compareCards));

    expect(sorted[0].hand).toBe("77797");
    expect(sorted[1].hand).toBe("7777J");
    expect(sorted[2].hand).toBe("77776");
    expect(sorted[3].hand).toBe("77773");
})


test('getTotal', () => {

    const sorted = testHands.sort((a, b) => compareHands(a, b, getKind, compareCards));

    expect(getTotal(sorted)).toBe(6440);
})