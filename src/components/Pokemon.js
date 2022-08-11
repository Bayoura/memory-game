function Pokemon({ pokemon, name, sprite, shuffle, checkClick }) {
  function handleClick() {
    checkClick(pokemon.id);
    shuffle();
  }

  return (
    <div onClick={handleClick}>
      <img src={sprite} alt={name} />
      <p>{name}</p>
    </div>
  );
}

export default Pokemon;
