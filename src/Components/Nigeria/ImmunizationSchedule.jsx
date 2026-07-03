import './immunization.scss';
import { useEffect, useState } from 'react';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { getImmunizationSchedule } from '../../services/api';

const ImmunizationSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    getImmunizationSchedule()
      .then(({ data }) => {
        setSchedule(data.schedule);
        setNote(data.note);
      })
      .catch(() => {});
  }, []);

  if (schedule.length === 0) return null;

  return (
    <section className="immunization">
      <div className="immunization__header">
        <VaccinesIcon className="immunization__icon" />
        <div>
          <h3 className="immunization__title">Nigerian Child Immunization Schedule</h3>
          <p className="immunization__note">{note}</p>
        </div>
      </div>
      <div className="immunization__table-wrap">
        <table className="immunization__table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Vaccines</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.age}>
                <td className="immunization__age">{row.age}</td>
                <td>
                  <div className="immunization__vaccines">
                    {row.vaccines.map((v) => (
                      <span key={v} className="immunization__vaccine">{v}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ImmunizationSchedule;
