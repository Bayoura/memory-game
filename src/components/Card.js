function Card({ card, name, shuffle, checkClick }) {
  function handleClick() {
    checkClick(card.id);
    shuffle();
  }

  return <button onClick={handleClick}>{name}</button>;
}

export default Card;
