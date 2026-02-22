import React from 'react';

const Controls = ({ onStart, onReset, isRunning }) => {
  return (
    <div className="flex space-x-4 mb-6">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow transition duration-200"
        >
          Iniciar
        </button>
      ) : (
        <button
           disabled
           className="bg-gray-400 text-white font-bold py-2 px-6 rounded shadow cursor-not-allowed"
        >
            Jugando...
        </button>
      )}
      <button
        onClick={onReset}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded shadow transition duration-200"
      >
        Reiniciar
      </button>
    </div>
  );
};

export default Controls;
