import React, { useEffect, useState } from "react";
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

  // invoke shuffle when the component mounts
  useEffect(() => {
    shuffle();
  }, []);

  useEffect(() => {
    if (game.currentScore > game.highScore) {
      console.log(
        `Is ${game.currentScore} bigger than ${game.highScore}??`,
        game.currentScore > game.highScore
      );
      setGame((current) => {
        return {
          ...current,
          highScore: game.currentScore,
        };
      });
    }
  }, [game.currentScore, game.highScore]);

  function checkClick(id) {
    const newCards = [...game.cards];
    const card = newCards.find((card) => card.id === id);
    if (card.clicked === true) {
      gameOver();
    } else {
      card.clicked = true;
      setGame((current) => {
        return {
          ...current,
          cards: newCards,
          currentScore: game.currentScore + 1,
        };
      });
    }
  }

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

  function gameOver() {
    alert("Game Over!");
    const newCards = [...game.cards];
    newCards.map((card) => (card.clicked = false));
    setGame((current) => {
      return { ...current, cards: newCards, currentScore: 0 };
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
      </header>
      <div>
        <p>Score: {game.currentScore}</p>
        <p>High Score: {game.highScore}</p>
        <CardGrid
          cards={game.cards}
          shuffle={shuffle}
          checkClick={checkClick}
        />
      </div>
    </div>
  );
}

export default App;
