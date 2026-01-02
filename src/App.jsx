import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Timer from './components/Timer';
import Controls from './components/Controls';
import { generarColoresUnicos } from './utils';

// Icons for the cards (using emojis or text for now, could be replaced with images)
const ICONS = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝', '🍉', '🍋', '🥑', '🥥', '🍆', '🥔', '🥕'];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Game initialization
  const initializeGame = () => {
    // Generate pairs
    const numberOfPairs = 15;
    const colors = generarColoresUnicos(numberOfPairs);
    const selectedIcons = ICONS.slice(0, numberOfPairs);

    let newCards = [];
    for (let i = 0; i < numberOfPairs; i++) {
        const cardData = {
            id: i, // Pair ID
            color: colors[i],
            icon: selectedIcons[i] || `${i+1}`, // Fallback to number if icons run out
        };
        // Add two cards for each pair
        newCards.push({ ...cardData, uniqueId: `card-${i}-1`, isFlipped: false, isMatched: false });
        newCards.push({ ...cardData, uniqueId: `card-${i}-2`, isFlipped: false, isMatched: false });
    }

    // Shuffle cards
    newCards = newCards.sort(() => Math.random() - 0.5);

    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setTime(0);
    setIsRunning(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleStart = () => {
    if (!isRunning) {
        setIsRunning(true);
        // Optionally reset if game was finished
        if (matchedPairs === 15) {
            initializeGame();
            setIsRunning(true);
        }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    initializeGame();
  };

  const handleCardClick = (clickedCard) => {
    if (!isRunning) return; // Game must be running
    if (isLocked) return; // Board is locked (waiting for mismatch animation)
    if (clickedCard.isMatched) return; // Already matched
    if (clickedCard.isFlipped) return; // Already flipped

    // Flip the clicked card
    const newCards = cards.map((card) =>
      card.uniqueId === clickedCard.uniqueId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsLocked(true);
      const [firstCard, secondCard] = newFlippedCards;

      if (firstCard.id === secondCard.id) {
        // Match found
        setTimeout(() => {
            const matchedCards = newCards.map((card) =>
            card.id === firstCard.id ? { ...card, isMatched: true } : card
            );
            setCards(matchedCards);
            setFlippedCards([]);
            setMatchedPairs((prev) => prev + 1);
            setIsLocked(false);
        }, 500);

      } else {
        // No match
        setTimeout(() => {
          const resetCards = newCards.map((card) =>
            card.uniqueId === firstCard.uniqueId || card.uniqueId === secondCard.uniqueId
              ? { ...card, isFlipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  // Check for win condition
  useEffect(() => {
    if (matchedPairs === 15 && matchedPairs > 0) {
      setIsRunning(false);
      // We can show a victory message here
      setTimeout(() => alert(`🎉 ¡Ganaste! Tiempo: ${Math.floor(time / 1000)} segundos`), 100);
    }
  }, [matchedPairs, time]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Juego de Parejas</h1>
      <p className="mb-8 text-lg text-center max-w-xl text-gray-600">
        ¡Encuentra todos los pares en el menor tiempo posible!
      </p>

      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between w-full items-center mb-6 px-4">
             <Controls onStart={handleStart} onReset={handleReset} isRunning={isRunning} />
             <Timer time={time} />
        </div>

        <Board cards={cards} onCardClick={handleCardClick} />

        <div className="mt-4 text-gray-500 font-medium">
            Parejas encontradas: {matchedPairs} / 15
        </div>
      </div>
    </div>
  );
}

export default App;
