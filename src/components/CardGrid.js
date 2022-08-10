import Card from "./Card";

function CardGrid({ cards, shuffle, checkClick }) {
  return (
    <div>
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            name={card.name}
            shuffle={shuffle}
            checkClick={checkClick}
          />
        );
      })}
    </div>
  );
}

export default CardGrid;
