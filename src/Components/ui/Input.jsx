import './input.scss';

const Input = ({
  label,
  id,
  error,
  as: Component = 'input',
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className="form-field__label">
          {label}
        </label>
      )}
      <Component id={id} className="form-field__input" {...props}>
        {children}
      </Component>
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

export default Input;
