import './result.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Footer from '../../Components/Footer/Footer';
import Container from '../../Components/ui/Container';
import Card from '../../Components/ui/Card';
import Button from '../../Components/ui/Button';
import ChatPanel from '../../Components/Chat/ChatPanel';
import EmergencyBanner from '../../Components/Nigeria/EmergencyBanner';
import HealthResources from '../../Components/Nigeria/HealthResources';
import PHCFinder from '../../Components/Nigeria/PHCFinder';
import Loading from '../../Components/Loading/Loading';
import { getSession } from '../../services/api';

const HOSPITAL_URL = 'https://www.google.com/maps/search/hospitals+in+Nigeria';
const PHARMACY_URL = 'https://www.google.com/maps/search/pharmacy+in+Nigeria';

const TRIAGE_STYLES = {
  emergency: { label: 'Emergency', className: 'result__triage--emergency' },
  high: { label: 'High Priority', className: 'result__triage--high' },
  medium: { label: 'Medium Priority', className: 'result__triage--medium' },
  low: { label: 'Low Priority', className: 'result__triage--low' },
};

const TOOL_LABELS = {
  maternal: 'Maternal Health Assessment',
  'child-fever': 'Child Fever Assessment',
  'sickle-cell': 'Sickle Cell Assessment',
  'mental-health': 'Mental Wellness Assessment',
  'medication-safety': 'Medication Safety Assessment',
  'hiv-awareness': 'HIV Risk Assessment',
  'child-nutrition': 'Child Nutrition Assessment',
  'snake-bite': 'Snake Bite First Aid',
  'prescription-reader': 'Prescription Explanation',
  'herbal-safety': 'Herbal Medicine Safety Assessment',
};

const Result = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      navigate('/askai', { replace: true });
      return;
    }

    getSession(sessionId)
      .then(({ data }) => {
        setSession(data.session);
        setMessages(data.messages || []);
      })
      .catch(() => {
        setError('Session not found. Please start a new symptom check.');
      })
      .finally(() => setLoading(false));
  }, [sessionId, navigate]);

  if (loading) return <Loading />;

  if (error || !session) {
    return (
      <Container>
        <div className="result__error">
          <p>{error || 'Something went wrong.'}</p>
          <Button variant="primary" onClick={() => navigate('/askai')}>
            Start New Check
          </Button>
        </div>
      </Container>
    );
  }

  const isToolSession = session.toolType && session.toolType !== 'symptom';
  const triage = session.triageLevel ? TRIAGE_STYLES[session.triageLevel] : null;

  const sections = isToolSession
    ? [{ title: TOOL_LABELS[session.toolType] || 'AI Assessment', content: session.symptomsCheck, icon: '🏥' }]
    : [
        { title: 'Symptom Suggestion', content: session.symptomsCheck, icon: '🔍' },
        { title: 'Possible Cause', content: session.causes, icon: '💡' },
        { title: 'What To Do Next', content: session.treatment, icon: '✅' },
      ].filter((s) => s.content);

  return (
    <div className="result">
      <Container>
        <EmergencyBanner />

        <div className="result__header">
          <h1 className="result__title">
            Hi {session.fullName}, here&apos;s your {isToolSession ? 'assessment' : 'health summary'}
          </h1>
          {triage && (
            <div className={`result__triage ${triage.className}`}>
              <span className="result__triage-level">{triage.label}</span>
              <span className="result__triage-reason">{session.triageReason}</span>
            </div>
          )}
          <p className="result__subtitle">
            {session.isDemo && (
              <span className="result__demo-tag">Demo mode — </span>
            )}
            Review your AI-generated insights below. This is not a medical diagnosis.
          </p>
        </div>

        <div className="result__main">
          <div className="result__left">
            <div className="result__cards">
              {sections.map((section) => (
                <Card key={section.title} accent hover className="result__card">
                  <div className="result__card-header">
                    <span className="result__card-icon">{section.icon}</span>
                    <h2 className="result__card-title">{section.title}</h2>
                  </div>
                  <div className="result__card-body">{section.content}</div>
                </Card>
              ))}
            </div>

            <div className="result__warning">
              <WarningAmberIcon className="result__warning-icon" />
              <p>
                If you are experiencing a medical emergency, call <strong>112</strong> or{' '}
                <strong>199</strong> immediately. Visit your nearest primary health centre
                or general hospital for in-person care.
              </p>
            </div>
          </div>

          <div className="result__right">
            <ChatPanel
              sessionId={sessionId}
              initialMessages={messages}
              context={{ toolType: session.toolType, symptoms: session.symptoms }}
            />
          </div>
        </div>

        <section className="result__actions-panel">
          <h2 className="result__actions-title">Take Action Now</h2>
          <div className="result__options">
            <a className="result__option" href={HOSPITAL_URL} target="_blank" rel="noopener noreferrer">
              <PlaceIcon className="result__option-icon" />
              <div className="result__option-content">
                <span className="result__option-head">Find a Hospital</span>
                <span className="result__option-text">Locate hospitals across Nigeria</span>
              </div>
            </a>
            <a className="result__option" href={PHARMACY_URL} target="_blank" rel="noopener noreferrer">
              <LocalPharmacyIcon className="result__option-icon" />
              <div className="result__option-content">
                <span className="result__option-head">Find a Pharmacy</span>
                <span className="result__option-text">Registered chemists near you</span>
              </div>
            </a>
            <div className="result__option result__option--disabled">
              <VideoCallIcon className="result__option-icon" />
              <div className="result__option-content">
                <span className="result__option-head">
                  Telemedicine
                  <span className="result__badge">Coming Soon</span>
                </span>
                <span className="result__option-text">Video consultation with a Nigerian doctor</span>
              </div>
            </div>
          </div>
        </section>

        <HealthResources />

        <PHCFinder />

        <div className="result__actions">
          <Button variant="outline" onClick={() => navigate('/tools')}>
            More Health Tools
          </Button>
          <Button variant="outline" onClick={() => navigate('/history')}>
            View History
          </Button>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Result;
