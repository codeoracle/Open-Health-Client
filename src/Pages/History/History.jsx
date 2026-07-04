import './history.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '../../Components/ui/Container';
import Button from '../../Components/ui/Button';
import Footer from '../../Components/Footer/Footer';
import { getSessionHistory } from '../../services/api';

const History = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSessionHistory()
      .then(({ data }) => setSessions(data.sessions))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'Z');
    return date.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="history">
      <Container>
        <div className="history__header">
          <HistoryIcon className="history__icon" />
          <div>
            <h1 className="history__title">Your Health Check History</h1>
            <p className="history__subtitle">
              Past checks from this device only — not shared with other users
            </p>
          </div>
        </div>

        {loading && <p className="history__loading">Loading history...</p>}

        {!loading && sessions.length === 0 && (
          <div className="history__empty">
            <p>No symptom checks yet. Start your first health assessment.</p>
            <Button variant="primary" onClick={() => navigate('/askai')}>
              Check Symptoms
            </Button>
          </div>
        )}

        <div className="history__list">
          {sessions.map((session) => (
            <button
              key={session.id}
              className="history__item"
              onClick={() => navigate(`/result/${session.id}`)}
            >
              <div className="history__item-content">
                <span className="history__item-name">{session.fullName}</span>
                <span className="history__item-symptoms">{session.symptoms}</span>
                <span className="history__item-meta">
                  {session.gender}, age {session.ageRange} · {formatDate(session.createdAt)}
                  {session.isDemo && <span className="history__demo">Demo</span>}
                </span>
              </div>
              <ArrowForwardIosIcon className="history__arrow" />
            </button>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default History;
