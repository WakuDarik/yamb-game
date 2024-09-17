// src/types.ts

export interface Player {
  id: number;
  name: string;
  scores: Score[];
}

export interface Score {
  category: Category;
  value: number | null;
  isUsed: boolean;
}

export enum Category {
  Ones = "Σ 1",
  Twos = "Σ 2",
  Threes = "Σ 3",
  Fours = "Σ 4",
  Fives = "Σ 5",
  Sixes = "Σ 6",
  ThreeOfAKind = "Трійка",
  FourOfAKind = "Чотирикат",
  FullHouse = "Фул-хаус",
  SmallStraight = "Малий стріт",
  LargeStraight = "Великий стріт",
  Yamb = "Йаче",
  Chance = "Шанс Σ",
}

export interface BoardProps {
  players: Player[];
}
