import React from 'react';
import Card from './Card';

const Board = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
      {cards.map((card) => (
        <Card
          key={card.uniqueId}
          card={card}
          onClick={onCardClick}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
        />
      ))}
    </div>
  );
};

export default Board;
