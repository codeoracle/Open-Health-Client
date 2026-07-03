import './footer.scss';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <HealthAndSafetyIcon className="footer__logo" />
          <span className="footer__name">OpenHealth</span>
        </div>

        <p className="footer__disclaimer">
          OpenHealth is not a substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of a qualified healthcare provider.
        </p>

        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {year} OpenHealth. All rights reserved.
          </span>
          <nav className="footer__links">
            <a href="#privacy" className="footer__link">Privacy Policy</a>
            <a href="#terms" className="footer__link">Terms &amp; Conditions</a>
            <a href="#cookies" className="footer__link">Cookie Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
