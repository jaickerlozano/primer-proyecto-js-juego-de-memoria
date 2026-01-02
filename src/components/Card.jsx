import React from 'react';

const Card = ({ card, onClick, isFlipped, isMatched }) => {
  return (
    <div
      className={`relative w-20 h-28 sm:w-24 sm:h-32 m-1 cursor-pointer transition-all duration-500 perspective-1000 group`}
      onClick={() => onClick(card)}
    >
        <div className={`relative w-full h-full text-center transition-transform duration-500 transform-style-3d ${isFlipped || isMatched ? 'rotate-y-180' : ''}`}>
            {/* Front of card (Hidden when flipped) */}
            <div className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md backface-hidden flex items-center justify-center border-2 border-white/20">
                <span className="text-white text-3xl font-bold opacity-80">?</span>
            </div>

            {/* Back of card (Shown when flipped) */}
            <div
                className="absolute w-full h-full rounded-lg shadow-md backface-hidden rotate-y-180 flex items-center justify-center border-2 border-blue-500"
                style={{ backgroundColor: card.color }}
            >
                <span className="text-4xl filter drop-shadow-md">{card.icon}</span>
            </div>
        </div>
    </div>
  );
};

export default Card;
