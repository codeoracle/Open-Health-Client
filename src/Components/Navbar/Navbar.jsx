import './navbar.scss'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className='navbar'>
        <div className="navWrap">

            <Link to={'/'} className="logoWrap">
            <HealthAndSafetyIcon className='logoIcon'/>
            <span className="logo">OpenHealth</span>
            </Link>

            <div className={click ? "menuWrap active" : "menuWrap"}>

            <nav className="menu">
             <a href="/#benefits" className="menuList">Benefits</a>
            <a href="/#howitwork" className="menuList">How It Works</a>
            <a href="/#whyus" className="menuList">Why us</a>
            <Link to={'/'} className="menuList">Blog</Link>
            </nav>

            <Link to={'/askai'} className="btnWrap">
            <button className="btn">Ask ai</button>
            </Link>
            </div>
             <div className="nav-icon" onClick={handleClick}>

            {click ? (
              <span className="icon">
              <CloseIcon />
              </span>
            ) : (
              <span className="icon">
                <MenuIcon />{" "}
              </span>
            )}
          </div>
        </div>
    </div>
  )
}

export default Navbar