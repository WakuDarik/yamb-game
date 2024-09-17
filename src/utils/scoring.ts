// src/utils/scoring.ts
import { Category, Score } from '../types';

export const calculateScore = (dice: number[], category: Category): number => {
  const counts: { [key: number]: number } = {};
  dice.forEach((die) => {
    counts[die] = (counts[die] || 0) + 1;
  });

  const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);

  switch (category) {
    case Category.Ones:
      return (counts[1] || 0) * 1;
    case Category.Twos:
      return (counts[2] || 0) * 2;
    case Category.Threes:
      return (counts[3] || 0) * 3;
    case Category.Fours:
      return (counts[4] || 0) * 4;
    case Category.Fives:
      return (counts[5] || 0) * 5;
    case Category.Sixes:
      return (counts[6] || 0) * 6;
    case Category.ThreeOfAKind:
      if (Object.values(counts).some((count) => count >= 3)) {
        return sum(dice);
      }
      return 0;
    case Category.FourOfAKind:
      if (Object.values(counts).some((count) => count >= 4)) {
        return sum(dice);
      }
      return 0;
    case Category.FullHouse:
      if (
        Object.values(counts).includes(3) &&
        Object.values(counts).includes(2)
      ) {
        return 25; // Наприклад, 25 балів за Фул-хаус
      }
      return 0;
    case Category.SmallStraight:
      if (
        (new Set(dice).has(1) &&
          new Set(dice).has(2) &&
          new Set(dice).has(3) &&
          new Set(dice).has(4)) ||
        (new Set(dice).has(2) &&
          new Set(dice).has(3) &&
          new Set(dice).has(4) &&
          new Set(dice).has(5))
      ) {
        return 30; // Наприклад, 30 балів за Малий стріт
      }
      return 0;
    case Category.LargeStraight:
      if (
        (new Set(dice).has(1) &&
          new Set(dice).has(2) &&
          new Set(dice).has(3) &&
          new Set(dice).has(4) &&
          new Set(dice).has(5)) ||
        (new Set(dice).has(2) &&
          new Set(dice).has(3) &&
          new Set(dice).has(4) &&
          new Set(dice).has(5) &&
          new Set(dice).has(6))
      ) {
        return 40; // Наприклад, 40 балів за Великий стріт
      }
      return 0;
    case Category.Yamb:
      if (Object.values(counts).some((count) => count === 5)) {
        return 50; // Наприклад, 50 балів за Йаче
      }
      return 0;
    case Category.Chance:
      return sum(dice);
    default:
      return 0;
  }
};
