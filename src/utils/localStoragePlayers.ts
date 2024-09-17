import { Player } from "../types";

const keyes = {
  playerData: "yamb-playerData",
  currentPlayerIndex: "yamb-currentPlayerIndex",
  gameOver: "yamb-gameOver",
};

export const serializePlayers = () => {
  const saved = localStorage.getItem(keyes.playerData);
  return saved ? JSON.parse(saved) : null;
};

export const getPlayers = (players: Player[]) => {
  const saved = localStorage.getItem(keyes.playerData);
  return saved ? JSON.parse(saved) : players;
};

export const getCurrentPlayerIndex = () => {
  const saved = localStorage.getItem(keyes.currentPlayerIndex);
  return saved ? JSON.parse(saved) : 0;
};

export const getGameOver = () => {
  const saved = localStorage.getItem(keyes.gameOver);
  return saved ? JSON.parse(saved) : false;
};

export const savePlayers = (players: any) => {
  localStorage.setItem(keyes.playerData, JSON.stringify(players));
};

export const saveCurrentPlayerIndex = (index: number) => {
  localStorage.setItem(keyes.currentPlayerIndex, JSON.stringify(index));
};

export const saveGameOver = (gameOver: boolean) => {
  localStorage.setItem(keyes.gameOver, JSON.stringify(gameOver));
};

export const issetGame = () => {
  return (
    localStorage.getItem(keyes.playerData) &&
    localStorage.getItem(keyes.currentPlayerIndex) &&
    localStorage.getItem(keyes.gameOver)
  );
};

export const clearLocalStorage = () => {
  localStorage.clear();
  window.location.reload();
};
