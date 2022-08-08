import React, { useState } from "react";
import CardGrid from "./components/CardGrid";
import { v4 as uuidv4 } from "uuid";

function App() {
  const newGame = {
    cards: [
      {
        name: "1",
        id: uuidv4(),
        clicked: false,
      },
      {
        name: "2",
        id: uuidv4(),
        clicked: false,
      },
      {
        name: "3",
        id: uuidv4(),
        clicked: false,
      },
      {
        name: "4",
        id: uuidv4(),
        clicked: false,
      },
      {
        name: "5",
        id: uuidv4(),
        clicked: false,
      },
    ],
    currentScore: 0,
    highScore: 0,
  };

  const [game, setGame] = useState(newGame);

  //fisher-yates shuffle
  function shuffle() {
    const newCards = [...game.cards];
    for (let i = newCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setGame((current) => {
      return {
        ...current,
        cards: newCards,
      };
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
      </header>
      <div>
        <CardGrid cards={game.cards} shuffle={shuffle} />
      </div>
    </div>
  );
}

export default App;
