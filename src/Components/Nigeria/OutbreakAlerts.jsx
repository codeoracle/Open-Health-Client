import './outbreak-alerts.scss';
import { useEffect, useState } from 'react';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { getOutbreakAlerts } from '../../services/api';

const SEVERITY_CLASS = {
  high: 'outbreak-alerts__item--high',
  medium: 'outbreak-alerts__item--medium',
};

const OutbreakAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getOutbreakAlerts()
      .then(({ data }) => setAlerts(data.alerts))
      .catch(() => {});
  }, []);

  if (alerts.length === 0) return null;

  return (
    <section className="outbreak-alerts">
      <div className="outbreak-alerts__header">
        <WarningAmberIcon className="outbreak-alerts__icon" />
        <h3 className="outbreak-alerts__title">Seasonal Disease Alerts — Nigeria</h3>
      </div>
      <div className="outbreak-alerts__list">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`outbreak-alerts__item ${SEVERITY_CLASS[alert.severity] || ''}`}
          >
            <div className="outbreak-alerts__item-head">
              <strong>{alert.title}</strong>
              <span className="outbreak-alerts__season">{alert.season}</span>
            </div>
            <p className="outbreak-alerts__symptoms">
              <strong>Symptoms:</strong> {alert.symptoms}
            </p>
            <p className="outbreak-alerts__action">
              <strong>Action:</strong> {alert.action}
            </p>
            <p className="outbreak-alerts__regions">
              <strong>Regions:</strong> {alert.regions.join(', ')}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OutbreakAlerts;
