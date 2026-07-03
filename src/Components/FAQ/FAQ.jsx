import { useState } from 'react';
import './faq.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: 'Is OpenHealth a replacement for seeing a doctor?',
    answer:
      'No. OpenHealth provides general health information based on your symptoms. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.',
  },
  {
    question: 'Is my health information kept private?',
    answer:
      'We take your privacy seriously. Your symptom data is used only to generate your health summary and is not shared with third parties without your consent.',
  },
  {
    question: 'How accurate are the AI symptom suggestions?',
    answer:
      'Our AI is trained on medical knowledge to provide helpful preliminary insights. However, accuracy varies and results should be used as a starting point for further consultation with a healthcare professional.',
  },
  {
    question: 'What should I do in a medical emergency?',
    answer:
      'If you are experiencing a medical emergency, do not use this tool. Call your local emergency number immediately or go to the nearest emergency room.',
  },
  {
    question: 'Can I use OpenHealth on my phone?',
    answer:
      'Yes! OpenHealth is fully responsive and works on smartphones, tablets, and desktop computers.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <h2 className="faq__title">Frequently Asked Questions</h2>
      <p className="faq__subtitle">Everything you need to know about OpenHealth</p>

      <div className="faq__list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq__item ${openIndex === index ? 'faq__item--open' : ''}`}
          >
            <button
              className="faq__question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              {item.question}
              <ExpandMoreIcon className="faq__icon" />
            </button>
            <div className="faq__answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
