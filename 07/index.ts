import input from "./input.js";

let rows = input.trim().split("\n");

export type Card = "A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
export type Kind = "fiveOfAKind" | "fourOfAKind" | "fullHouse" | "threeOfAKind" | "twoPair" | "onePair" | "highCard";

export type Hand = {
  hand: string, // five cards
  cards: Card[],
  bid: number
}

export function parseInput(input: string): Hand[] {
  let rows = input.trim().split("\n");
return rows.map(r => {
  const [hand, bid] = r.split(" ");
  return { hand, cards: hand.split("").map(c => c as Card), bid: parseInt(bid) };
})
}

const hands = parseInput(input);

export function getKind(hand: Hand): Kind {

  const groups = hand.cards.reduce( function (prev, item) { 
    if ( item in prev ) prev[item] ++; 
    else prev[item] = 1; 
    return prev; 
  }, {} ) as Record<Card, number>;

  let groupsFlat = Object.values(groups).sort((a: number, b: number) => b - a) as number[];

  if (groupsFlat[0] === 5) {
    return "fiveOfAKind";
  } else if (groupsFlat[0] === 4) {
    return "fourOfAKind";
  } else if (groupsFlat[0] === 3 && groupsFlat[1] === 2) {
    return "fullHouse";
  } else if (groupsFlat[0] === 3) {
    return "threeOfAKind";
  } else if (groupsFlat[0] === 2 && groupsFlat[1] === 2) {
    return "twoPair";
  } else if (groupsFlat[0] === 2) {
    return "onePair";
  } else {
    return "highCard";
  }
}

export function compareHands(
  hand1: Hand,
  hand2: Hand,
  getKind: (hand: Hand) => Kind,
  compareCards: (card1: Card, card2: Card) => number): number
{
  const kind1 = getKind(hand1);
  const kind2 = getKind(hand2);

  const kinds = { fiveOfAKind: 1, fourOfAKind: 2, fullHouse: 3, threeOfAKind: 4, twoPair: 5, onePair: 6, highCard: 7 };

  if (kinds[kind1] === kinds[kind2]) {
    if (hand1.cards[0] !== hand2.cards[0]) {
      return compareCards(hand1.cards[0], hand2.cards[0]);
    } else if (hand1.cards[1] !== hand2.cards[1]) {
      return compareCards(hand1.cards[1], hand2.cards[1]);
    } else if (hand1.cards[2] !== hand2.cards[2]) {
      return compareCards(hand1.cards[2], hand2.cards[2]);
    } else if (hand1.cards[3] !== hand2.cards[3]) {
      return compareCards(hand1.cards[3], hand2.cards[3]);
    } else {
      return compareCards(hand1.cards[4], hand2.cards[4]);
    }
  }

  return kinds[kind1] - kinds[kind2];
}

export function compareCards(card1: Card, card2: Card): number {
  const cards = { A: 1, K: 2, Q: 3, J: 4, T: 5, 9: 6, 8: 7, 7: 8, 6: 9, 5: 10, 4: 11, 3: 12, 2: 13 };

  return cards[card1] - cards[card2];
}

export function getTotal(sortedHands: Hand[]): number {
  let total = 0;

  for (let i = 0; i < sortedHands.length; i++) {
    total += sortedHands[i].bid * (sortedHands.length - i);
  }

  return total;
}

const sortedHands = hands.sort((a, b) => compareHands(a, b, getKind, compareCards));
const total = getTotal(sortedHands);

console.log("total part 1:", total);

export function getKind2(hand: Hand): Kind {

  const groups = hand.cards.reduce( function (prev, item) { 
    if ( item in prev ) prev[item] ++; 
    else prev[item] = 1; 
    return prev; 
  }, {} ) as Record<Card, number>;

  let jCount = 0;

  if (groups.hasOwnProperty('J') && groups['J'] !== 5) {
    jCount = groups['J'];
    delete groups['J'];
  }

  let groupsFlat = Object.values(groups).sort((a: number, b: number) => b - a) as number[];

  groupsFlat[0] += jCount;

  if (groupsFlat[0] === 5) {
    return "fiveOfAKind";
  } else if (groupsFlat[0] === 4) {
    return "fourOfAKind";
  } else if (groupsFlat[0] === 3 && groupsFlat[1] === 2) {
    return "fullHouse";
  } else if (groupsFlat[0] === 3) {
    return "threeOfAKind";
  } else if (groupsFlat[0] === 2 && groupsFlat[1] === 2) {
    return "twoPair";
  } else if (groupsFlat[0] === 2) {
    return "onePair";
  } else {
    return "highCard";
  }
}

export function compareCards2(card1: Card, card2: Card): number {
  const cards = { A: 1, K: 2, Q: 3, T: 5, 9: 6, 8: 7, 7: 8, 6: 9, 5: 10, 4: 11, 3: 12, 2: 13, J: 14, };

  return cards[card1] - cards[card2];
}

const sortedHands2 = hands.sort((a, b) => compareHands(a, b, getKind2, compareCards2));
const total2 = getTotal(sortedHands2);

console.log("total part 2:", total2);