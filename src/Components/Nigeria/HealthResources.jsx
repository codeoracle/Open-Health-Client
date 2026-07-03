import './health-resources.scss';
import { useEffect, useState } from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { getNigeriaResources, getNigeriaConditions } from '../../services/api';

const categoryIcons = {
  insurance: HealthAndSafetyIcon,
  government: HealthAndSafetyIcon,
  facilities: LocalHospitalIcon,
  maternal: HealthAndSafetyIcon,
  safety: HealthAndSafetyIcon,
  mental: PsychologyIcon,
  hiv: FavoriteIcon,
};

const HealthResources = () => {
  const [resources, setResources] = useState([]);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    getNigeriaResources()
      .then(({ data }) => setResources(data.resources))
      .catch(() => {});
    getNigeriaConditions()
      .then(({ data }) => setConditions(data.conditions))
      .catch(() => {});
  }, []);

  return (
    <div className="health-resources">
      <h3 className="health-resources__title">Nigeria Health Resources</h3>

      <div className="health-resources__grid">
        {resources.map((item) => {
          const Icon = categoryIcons[item.category] || LocalHospitalIcon;
          return (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="health-resources__card"
            >
              <Icon className="health-resources__icon" />
              <div>
                <span className="health-resources__card-title">{item.title}</span>
                <p className="health-resources__card-desc">{item.description}</p>
              </div>
              <OpenInNewIcon className="health-resources__arrow" />
            </a>
          );
        })}
      </div>

      {conditions.length > 0 && (
        <div className="health-resources__conditions">
          <h4 className="health-resources__subtitle">Common Conditions in Nigeria</h4>
          <div className="health-resources__condition-list">
            {conditions.map((c) => (
              <details key={c.name} className="health-resources__condition">
                <summary>{c.name}</summary>
                <p>{c.description}</p>
                <p><strong>Prevention:</strong> {c.prevention}</p>
                <p><strong>Action:</strong> {c.action}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthResources;
