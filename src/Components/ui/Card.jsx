import './card.scss';

const Card = ({ children, className = '', hover = false, accent = false }) => {
  return (
    <div
      className={`card ${hover ? 'card--hover' : ''} ${accent ? 'card--accent' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Card;
