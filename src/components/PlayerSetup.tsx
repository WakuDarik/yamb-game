// src/components/PlayerSetup.tsx
import React, { useState } from 'react';
import { Player, Category, Score } from '../types';

interface PlayerSetupProps {
  onSetupComplete: (players: Player[]) => void;
}

const categories = Object.values(Category);

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onSetupComplete }) => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(2).fill(''));

  const handleNumPlayersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value, 10);
    setNumPlayers(count);
    setPlayerNames(Array(count).fill(''));
  };

  const handleNameChange = (index: number, name: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = name;
    setPlayerNames(updatedNames);
  };

  const handleSubmit = () => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: index + 1,
      name: name || `Гравець ${index + 1}`,
      scores: categories.map((category) => ({
        category,
        value: null,
        isUsed: false,
      })),
    }));
    onSetupComplete(players);
  };

  return (
    <div>
      <h2>Налаштування Гравців</h2>
      <label>
        Кількість гравців:
        <select value={numPlayers} onChange={handleNumPlayersChange}>
          {[2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
      <div>
        {playerNames.map((name, index) => (
          <div key={index}>
            <label>
              Ім'я гравця {index + 1}:
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Створити Дошку</button>
    </div>
  );
};

export default PlayerSetup;
