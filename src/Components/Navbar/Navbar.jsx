import './navbar.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Button from '../ui/Button';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setClick(false);
  }, [location]);

  const handleClick = () => setClick(!click);

  const navLinks = isHome
    ? [
        { href: '/#benefits', label: 'Benefits' },
        { href: '/#tools', label: 'Health Tools' },
        { href: '/#howitwork', label: 'How It Works' },
        { href: '/#faq', label: 'FAQ' },
        { to: '/history', label: 'History' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/tools', label: 'Health Tools' },
        { to: '/history', label: 'History' },
      ];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <HealthAndSafetyIcon className="navbar__logo-icon" />
          <span className="navbar__logo-text">OpenHealth</span>
        </Link>

        <div className={`navbar__menu ${click ? 'navbar__menu--open' : ''}`}>
          <nav className="navbar__links">
            {navLinks.map((link) =>
              link.to ? (
                <Link key={link.to} to={link.to} className="navbar__link">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="navbar__link">
                  {link.label}
                </a>
              )
            )}
          </nav>
          <Link to="/askai">
            <Button variant="primary" size="sm">Check Symptoms</Button>
          </Link>
        </div>

        <button
          className="navbar__toggle"
          onClick={handleClick}
          aria-label={click ? 'Close menu' : 'Open menu'}
        >
          {click ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {click && <div className="navbar__overlay" onClick={handleClick} />}
    </header>
  );
};

export default Navbar;
