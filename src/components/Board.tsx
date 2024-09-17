// src/components/Board.tsx
import React, { useState, useEffect } from "react";
import { Player, Category, Score, BoardProps } from "../types";
import {
  clearLocalStorage,
  getCurrentPlayerIndex,
  getGameOver,
  getPlayers,
  saveCurrentPlayerIndex,
  saveGameOver,
  savePlayers,
} from "../utils/localStoragePlayers";

const Board: React.FC<BoardProps> = ({ players }) => {
  const [playerData, setPlayerData] = useState<Player[]>(getPlayers(players));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(
    getCurrentPlayerIndex()
  );
  const [gameOver, setGameOver] = useState<boolean>(getGameOver());

  const [tempScores, setTempScores] = useState<{ [key in Category]?: number }>(
    {}
  );

  useEffect(() => {
    savePlayers(playerData);
    saveCurrentPlayerIndex(currentPlayerIndex);
    saveGameOver(gameOver);
  }, [playerData, currentPlayerIndex, gameOver]);

  const handleInputChange = (category: Category, value: string) => {
    // Дозволяє вводити лише числа
    const numericValue = value.replace(/\D/, "");
    setTempScores({
      ...tempScores,
      [category]: numericValue === "" ? undefined : Number(numericValue),
    });
  };

  const handleScoreSave = (category: Category) => {
    const value = tempScores[category];
    if (value === undefined) {
      alert("Будь ласка, введіть значення.");
      return;
    }

    const updatedPlayers = playerData.map((player, index) => {
      if (index === currentPlayerIndex) {
        const updatedScores = player.scores.map((scoreItem) =>
          scoreItem.category === category
            ? { ...scoreItem, value, isUsed: true }
            : scoreItem
        );
        return { ...player, scores: updatedScores };
      }
      return player;
    });
    setPlayerData(updatedPlayers);
    setTempScores({});

    // Перехід до наступного гравця
    if (currentPlayerIndex < playerData.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setCurrentPlayerIndex(0);
      // Перевірка на завершення гри
      const allScoresFilled = updatedPlayers.every((player) =>
        player.scores.every((score) => score.value !== null)
      );
      if (allScoresFilled) {
        setGameOver(true);
      }
    }
  };

  const calculateTotal = (scores: Score[]): number => {
    return scores.reduce((total, score) => total + (score.value || 0), 0);
  };

  if (gameOver) {
    const sortedPlayers = [...playerData].sort(
      (a, b) => calculateTotal(b.scores) - calculateTotal(a.scores)
    );

    const winner = sortedPlayers[0];

    return (
      <div>
        <h2>Гра Завершена!</h2>
        <h3>
          Переможець: {winner.name} з {calculateTotal(winner.scores)} балів!
        </h3>
        <table border={1}>
          <thead>
            <tr>
              <th>Гравець</th>
              {Object.values(Category).map((category) => (
                <th key={category}>{category}</th>
              ))}
              <th>Всього</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player) => (
              <tr key={player.id}>
                <td>{player.name}</td>
                {player.scores.map((score) => (
                  <td key={score.category}>{score.value}</td>
                ))}
                <td>{calculateTotal(player.scores)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Clear localstorage */}
        <button onClick={clearLocalStorage}>Почати Нову Гру</button>
      </div>
    );
  }

  const currentPlayer = playerData[currentPlayerIndex];

  // Вибір категорії, яку ще не використовував гравець
  const availableCategories = currentPlayer.scores.filter(
    (score) => !score.isUsed
  );

  return (
    <div>
      <h2>Дошка Ямб</h2>
      <h3>Хід Гравця: {currentPlayer.name}</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Категорія</th>
            <th>Введіть Результат</th>
          </tr>
        </thead>
        <tbody>
          {availableCategories.map((score) => (
            <tr key={score.category}>
              <td>{score.category}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={tempScores[score.category] ?? ""}
                  onChange={(e) =>
                    handleInputChange(score.category, e.target.value)
                  }
                />
              </td>
              <td>
                <div
                  onClick={() => {
                    tempScores[score.category] === undefined
                      ? alert("Будь ласка, введіть значення.")
                      : handleScoreSave(score.category);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Поточний Счет</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Гравець</th>
            {Object.values(Category).map((category) => (
              <th key={category}>{category}</th>
            ))}
            <th>Всього</th>
          </tr>
        </thead>
        <tbody>
          {playerData.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              {player.scores.map((score) => (
                <td key={score.category}>
                  {score.value !== null ? score.value : "-"}
                </td>
              ))}
              <td>{calculateTotal(player.scores)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Clear localstorage */}
      <button onClick={clearLocalStorage}>Почати Нову Гру</button>
    </div>
  );
};

export default Board;
