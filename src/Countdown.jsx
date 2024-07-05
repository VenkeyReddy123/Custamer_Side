import React, { useState, useEffect } from 'react';

function Countdown() {
  // Get current time
  const currentTime = new Date();
  // Set midnight of the next day
  const midnight = new Date(currentTime);
  midnight.setHours(24, 0, 0, 0);

  // Calculate time remaining until midnight
  const timeRemaining = Math.floor((midnight - currentTime) / 1000);

  const [remainingTime, setRemainingTime] = useState(timeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  return (
    <div>
      {/* <h1>Countdown Timer</h1> */}
      <div>
        {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
      </div>
    </div>
  );
}

export default Countdown;
