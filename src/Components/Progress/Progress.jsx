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

    const startAnimation = () => {
      startTimestamp = Date.now();
      requestAnimationFrame(increment);
    };

    startAnimation();
  }, [targetNumber, duration]);

  return (
    <div>{progress}</div>
  )
}

export default Progress