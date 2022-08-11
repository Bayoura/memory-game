import React, { useEffect, useState } from "react";
import PokemonGrid from "./components/PokemonGrid";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function App() {
  const [score, setScore] = useState({ currentScore: 0, highScore: 0 });
  const [pokemon, setPokemon] = useState([]);

  // get random pokemon list and invoke shuffle when the component mounts
  useEffect(() => {
    fetchPokemon();
    shuffle();
  }, []);

  const fetchPokemon = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const poke = await res.json();
    const allPokemon = poke.results;
    const randPokemon = [];
    for (let i = 0; i < 20; i++) {
      randPokemon.push(
        allPokemon.splice(Math.floor(Math.random() * allPokemon.length), 1)
      );
    }

    getPokemon(randPokemon);
  };

  const getPokemon = async (randPokemon) => {
    const pokeList = [];
    for (let i = 0; i < randPokemon.length; i++) {
      const pokemonUrl = randPokemon[i][0].url;
      const response = await fetch(pokemonUrl);
      const pokemon = await response.json();
      const id = pokemon.id;
      const name = pokemon.name;
      const sprite = pokemon.sprites.front_default;
      pokeList.push({ id, name, sprite });
    }
    setPokemon(pokeList);
  };

  useEffect(() => {
    if (score.currentScore > score.highScore) {
      console.log(
        `Is ${score.currentScore} bigger than ${score.highScore}??`,
        score.currentScore > score.highScore
      );
      setScore((current) => {
        return {
          ...current,
          highScore: score.currentScore,
        };
      });
    }
  }, [score]);

  function checkClick(id) {
    const pokeList = [...pokemon];
    const target = pokeList.find((p) => p.id === id);
    if (target.clicked === true) {
      gameOver();
    } else {
      target.clicked = true;
      setPokemon(pokeList);
      setScore((current) => {
        return {
          ...current,
          currentScore: score.currentScore + 1,
        };
      });
    }
  }

  //fisher-yates shuffle
  function shuffle() {
    const pokeList = [...pokemon];
    for (let i = pokeList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [pokeList[i], pokeList[j]] = [pokeList[j], pokeList[i]];
    }
    setPokemon(pokeList);
  }

  function gameOver() {
    alert("Game Over!");
    const pokeList = [...pokemon];
    pokeList.map((p) => (p.clicked = false));
    setPokemon(pokeList);
    setScore((current) => {
      return {
        ...current,
        currentScore: 0,
      };
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Game</h1>
      </header>
      <div>
        <p>Score: {score.currentScore}</p>
        <p>High Score: {score.highScore}</p>
        <PokemonGrid
          pokemon={pokemon}
          shuffle={shuffle}
          checkClick={checkClick}
        />
      </div>
    </div>
  );
}

export default App;
