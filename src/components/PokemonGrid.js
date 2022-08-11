import Pokemon from "./Pokemon";

function PokemonGrid({ pokemon, shuffle, checkClick }) {
  return (
    <div>
      {pokemon.map((p) => {
        console.log(p);
        return (
          <Pokemon
            key={p.id}
            pokemon={p}
            name={p.name}
            sprite={p.sprite}
            shuffle={shuffle}
            checkClick={checkClick}
          />
        );
      })}
    </div>
  );
}

export default PokemonGrid;
