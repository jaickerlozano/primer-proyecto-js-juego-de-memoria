import React from 'react';

const Timer = ({ time }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-2xl font-mono mb-4 bg-gray-900 text-green-400 px-4 py-2 rounded shadow-inner">
      {formatTime(time)}
    </div>
  );
};

export default Timer;
