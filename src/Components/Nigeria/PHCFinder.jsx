import './phc-finder.scss';
import { useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { getPHCStates } from '../../services/api';

const PHCFinder = () => {
  const [states, setStates] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    getPHCStates()
      .then(({ data }) => setStates(data.states))
      .catch(() => {});
  }, []);

  const current = states.find((s) => s.state === selected);

  return (
    <section className="phc-finder">
      <div className="phc-finder__header">
        <PlaceIcon className="phc-finder__icon" />
        <div>
          <h3 className="phc-finder__title">Find a Primary Health Centre</h3>
          <p className="phc-finder__desc">
            30,000+ PHCs across Nigeria offer free basic care, immunization, and HIV testing.
          </p>
        </div>
      </div>
      <div className="phc-finder__controls">
        <select
          className="phc-finder__select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select your state</option>
          {states.map((s) => (
            <option key={s.state} value={s.state}>{s.state}</option>
          ))}
        </select>
        {current && (
          <div className="phc-finder__links">
            <a href={current.mapsUrl} target="_blank" rel="noopener noreferrer" className="phc-finder__link">
              <PlaceIcon fontSize="small" />
              Find PHC in {current.state}
              <OpenInNewIcon fontSize="small" />
            </a>
            <a href={current.hivTestUrl} target="_blank" rel="noopener noreferrer" className="phc-finder__link phc-finder__link--hiv">
              <PlaceIcon fontSize="small" />
              HIV Testing in {current.state}
              <OpenInNewIcon fontSize="small" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PHCFinder;
