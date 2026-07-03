import './loading.scss';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__content">
        <div className="loading__icon-wrap">
          <HealthAndSafetyIcon className="loading__icon" />
        </div>
        <h2 className="loading__head">Analyzing your symptoms</h2>
        <p className="loading__text">Just a heartbeat away from your results...</p>
        <div className="loading__bar">
          <div className="loading__bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
