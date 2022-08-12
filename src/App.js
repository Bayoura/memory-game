import React, { useEffect, useState } from "react";
import PokemonGrid from "./components/PokemonGrid";

function App() {
  const [score, setScore] = useState({ currentScore: 0, highScore: 0 });
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // get random pokemon list and invoke shuffle when the component mounts
  useEffect(() => {
    setLoading(true);
    fetchPokemon();
    shuffle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
      const sprite = pokemon.sprites.front_default;
      pokeList.push({ id, name, sprite });
    }
    setPokemon(pokeList);
    setLoading(false);
  };

  useEffect(() => {
    if (score.currentScore > score.highScore) {
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
    <div className="app">
      <header className="app-header">
        <h1>PokéMemory</h1>
      </header>
      <div className="explanation">Click each Pokémon only once!</div>
      <div className="score-container">
        <p>Score: {score.currentScore}</p>
        <p>High Score: {score.highScore}</p>
      </div>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <PokemonGrid
          pokemon={pokemon}
          shuffle={shuffle}
          checkClick={checkClick}
        />
      )}
    </div>
  );
}

export default App;
