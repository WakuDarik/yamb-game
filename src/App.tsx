// src/App.tsx
import React, { useState } from "react";
import PlayerSetup from "./components/PlayerSetup";
import Board from "./components/Board";
import { Player } from "./types";
import "./App.css";
import { issetGame, serializePlayers } from "./utils/localStoragePlayers";

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[] | null>(serializePlayers());
  console.log(issetGame());
  return (
    <div className="App">
      <h1>Гра Ямб</h1>
      {!players ? (
        <PlayerSetup onSetupComplete={setPlayers} />
      ) : (
        <Board players={players} />
      )}
    </div>
  );
};

export default App;
