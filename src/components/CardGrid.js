import Card from "./Card";

function CardGrid({ cards, shuffle }) {
  return (
    <div>
      {cards.map((card) => {
        return <Card key={cards.id} name={card.name} shuffle={shuffle} />;
      })}
    </div>
  );
}

export default CardGrid;
