import './chat.scss';
import { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { sendChatMessage } from '../../services/api';
import Button from '../ui/Button';

const getSuggestions = (context = {}) => {
  const { toolType, symptoms = '' } = context;
  const text = symptoms.toLowerCase();

  const byTool = {
    maternal: [
      'Is this a pregnancy emergency?',
      'What are danger signs I should watch for?',
      'When should I go to the hospital?',
      'How often should I attend antenatal care?',
    ],
    'child-fever': [
      'Could this be malaria?',
      'How do I prepare ORS at home?',
      'What temperature is dangerous for a child?',
      'When should I rush to the hospital?',
    ],
    'sickle-cell': [
      'How do I manage this pain crisis?',
      'When is a crisis an emergency?',
      'What foods help with sickle cell?',
      'How can I prevent future crises?',
    ],
    'mental-health': [
      'How do I cope with these feelings?',
      'Where can I get help in Nigeria?',
      'Is what I feel normal?',
      'How do I talk to family about this?',
    ],
    'medication-safety': [
      'Are these drugs safe together?',
      'How do I know if a drug is fake?',
      'What side effects should I expect?',
      'Can I buy this without prescription?',
    ],
    'hiv-awareness': [
      'Where can I get tested for free?',
      'How soon should I test?',
      'Is treatment really free in Nigeria?',
      'How do I stay protected?',
    ],
    'child-nutrition': [
      'How do I prepare ORS correctly?',
      'Is my child malnourished?',
      'What foods should I give my child?',
      'When is this an emergency?',
    ],
    'snake-bite': [
      'What should I do right now?',
      'Which hospital has antivenom?',
      'What should I avoid doing?',
      'How do I keep the person calm?',
    ],
    'prescription-reader': [
      'What is this drug for?',
      'How should I take it?',
      'What foods should I avoid?',
      'Are there side effects?',
    ],
    'herbal-safety': [
      'Is this herb safe with my drugs?',
      'Could this harm my liver or kidneys?',
      'Should I tell my doctor?',
      'When should I stop using it?',
    ],
  };

  if (toolType && byTool[toolType]) return byTool[toolType];

  const suggestions = [];
  if (/fever|malaria|chills|temperature/.test(text)) {
    suggestions.push('Could this be malaria or typhoid?');
  }
  if (/pain|ache|headache/.test(text)) {
    suggestions.push('How can I relieve this pain safely?');
  }
  if (/cough|chest|breath/.test(text)) {
    suggestions.push('Could this be a chest infection or TB?');
  }
  if (/stomach|diarrhoea|diarrhea|vomit/.test(text)) {
    suggestions.push('How do I avoid dehydration?');
  }

  while (suggestions.length < 4) {
    const defaults = [
      'Is this an emergency?',
      'What should I do next?',
      'Which hospital should I visit?',
      'When should I see a doctor?',
    ];
    const next = defaults.find((d) => !suggestions.includes(d));
    if (!next) break;
    suggestions.push(next);
  }

  return suggestions.slice(0, 4);
};

const ChatPanel = ({ sessionId, initialMessages = [], context = {} }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    if (hasInteracted.current && messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    hasInteracted.current = true;
    setInput('');
    setError('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const { data } = await sendChatMessage(sessionId, text);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply, isDemo: data.isDemo },
      ]);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const suggestions = getSuggestions(context);

  return (
    <div className="chat">
      <div className="chat__header">
        <SmartToyIcon className="chat__header-icon" />
        <div>
          <h3 className="chat__title">Continue the Conversation</h3>
          <p className="chat__subtitle">Ask follow-up questions about your assessment</p>
        </div>
      </div>

      <div className="chat__messages" ref={messagesRef}>
        {messages.length === 0 && (
          <p className="chat__empty">
            Ask anything about your symptoms, treatment options, or when to see a doctor.
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`chat__bubble chat__bubble--${msg.role}`}>
            {msg.role === 'assistant' ? (
              <SmartToyIcon className="chat__avatar" />
            ) : (
              <PersonIcon className="chat__avatar" />
            )}
            <div className="chat__bubble-content">
              <p>{msg.content}</p>
              {msg.isDemo && (
                <span className="chat__demo-badge">Demo response</span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat__bubble chat__bubble--assistant">
            <SmartToyIcon className="chat__avatar" />
            <div className="chat__bubble-content chat__typing">Thinking...</div>
          </div>
        )}
      </div>

      {error && <p className="chat__error">{error}</p>}

      <div className="chat__suggestions">
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            className="chat__suggestion"
            onClick={() => setInput(s)}
            disabled={loading}
          >
            {s}
          </button>
        ))}
      </div>

      <form className="chat__input-row" onSubmit={handleSend}>
        <input
          type="text"
          className="chat__input"
          placeholder="Type your health question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" variant="primary" size="sm" disabled={loading || !input.trim()}>
          <SendIcon fontSize="small" />
        </Button>
      </form>
    </div>
  );
};

export default ChatPanel;
