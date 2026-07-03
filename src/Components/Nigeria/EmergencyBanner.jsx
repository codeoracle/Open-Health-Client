import './emergency-banner.scss';
import PhoneIcon from '@mui/icons-material/Phone';
import { useEffect, useState } from 'react';
import { getNigeriaEmergency } from '../../services/api';

const FALLBACK_CONTACTS = [
  { name: 'National Emergency', number: '112' },
  { name: 'Nigeria Police', number: '199' },
  { name: 'Lagos Emergency', number: '767' },
];

const EmergencyBanner = () => {
  const [contacts, setContacts] = useState(FALLBACK_CONTACTS);

  useEffect(() => {
    getNigeriaEmergency()
      .then(({ data }) => setContacts(data.contacts.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="emergency-banner">
      <PhoneIcon className="emergency-banner__icon" />
      <div className="emergency-banner__content">
        <strong>Nigerian Emergency Numbers</strong>
        <div className="emergency-banner__numbers">
          {contacts.map((c) => (
            <a key={c.number + c.name} href={`tel:${c.number}`} className="emergency-banner__link">
              {c.name}: <span>{c.number}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;
