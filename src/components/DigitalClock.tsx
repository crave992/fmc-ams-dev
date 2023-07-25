import React from 'react';

interface DigitalClockProps {
  currentTime: Date;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ currentTime }) => {
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <p className="text-center">
        <span className="text-lg">Current Time: </span>
        <span className="text-2xl font-bold">{formattedTime}</span>
      </p>
    </div>
  );
};

export default DigitalClock;