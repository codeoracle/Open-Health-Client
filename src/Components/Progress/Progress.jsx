import { useState, useEffect } from 'react';

const Progress = ({ targetNumber, duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTimestamp;
    const increment = () => {
      const now = Date.now();
      const elapsed = now - startTimestamp;
      const progressPercentage = Math.min(1, elapsed / duration);
      const currentProgress = Math.floor(progressPercentage * targetNumber);
      setProgress(currentProgress);

      if (progressPercentage < 1) {
        requestAnimationFrame(increment);
      }
    };

    startTimestamp = Date.now();
    requestAnimationFrame(increment);
  }, [targetNumber, duration]);

  return (
    <div className="progress-stat">
      <span className="progress-stat__number">{progress}%</span>
      <div className="progress-stat__bar">
        <div
          className="progress-stat__fill"
          style={{ width: `${targetNumber ? (progress / targetNumber) * 100 : 0}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
