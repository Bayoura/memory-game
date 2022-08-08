function Card({ name, shuffle }) {
  return <button onClick={shuffle}>{name}</button>;
}

export default Card;
