import './section-heading.scss';

const SectionHeading = ({ title, subtitle, highlight, align = 'center', className = '' }) => {
  return (
    <div className={`section-heading section-heading--${align} ${className}`.trim()}>
      <h2 className="section-heading__title">
        {title}
        {highlight && <span className="section-heading__highlight"> {highlight}</span>}
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
