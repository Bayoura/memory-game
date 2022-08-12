function Pokemon({ pokemon, name, sprite, shuffle, checkClick }) {
  function handleClick() {
    checkClick(pokemon.id);
    shuffle();
  }

  return (
    <div onClick={handleClick}>
      <div className="pokemon-card">
        <img src={sprite} alt={name} />
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Pokemon;
