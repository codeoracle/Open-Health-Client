import './home.scss'
import Navbar from '../../Components/Navbar/Navbar'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DevicesIcon from '@mui/icons-material/Devices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Link } from 'react-router-dom';
import Progress from '../../Components/Progress/Progress';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>

        <div className="showcase" style={{ backgroundImage: "url(/img/home-page-background.webp)"}}>
            
            <div className="heroWrap">

            <div className="heroContent">
            <h1 className="heroTitle">Seamless Health at Your Fingertip</h1>
            <span className="herotext">Your health journey deserves a companion that never sleeps. OpenHealth is your 24/7 wellness wizard, offering continuous support and guidance whenever you need it.</span>
            <Link to={'/askai'} className="btnWrap">
            <span className="heroBtn">Request a Demo</span>
            <ArrowRightAltIcon className='heroIcon'/>
            </Link>
            </div>

            <img src="/img/Picture1-1.png" alt="Header-img" className="heroImg" />

            </div>
        </div>

        <div className="featuresWrap">
        <div className="features">
        <h3 className="featuretitle">Empowering Patients with Information to Navigate Health Choices</h3>
        <div className="featuresListWrap">
        <div className="featuresList">
        <span className="feaHead"><Progress targetNumber={85} duration={6000} />%</span>
        <span className="feaText">People Seeking Healthcare</span>
        </div>
        <div className="featuresList">
        <span className="feaHead"><Progress targetNumber={52} duration={6000} />%</span>
        <span className="feaText">Doctor to Patience</span>
        </div>
        <div className="featuresList">
        <span className="feaHead"><Progress targetNumber={21} duration={3000} />%</span>
        <span className="feaText">Patients with Knowledge of Their Health Issue</span>
        </div>
        <div className="featuresList">
        <span className="feaHead"><Progress targetNumber={38} duration={6000} />%</span>
        <span className="feaText">Availability of Healthcare Centers</span>
        </div>
        </div>
        </div>
        </div>

        <div className="whyUsWrap" id='benefits'>

            <div className="whyHeader">
            <h1 className="whyTitle">Small change,<span className='impact'> Big impact</span></h1>
            <span className="whyheadText">Access your health status at your convenience with OpenHealth, empowering you to take an active role in managing your well-being.</span>
            </div>

            <div className="whyListWrap">
            <div className="whyItem">
                <LocalHospitalIcon className="whyIcon" />
                <span className="itemHead">Quick and Accurate Diagnosis</span>
                <span className="itemText">Receive rapid and reliable insights into your health status.</span>
            </div>
            <div className="whyItem">
                <DevicesIcon className="whyIcon" />
                <span className="itemHead">Accessible Anytime, Anywhere</span>
                <span className="itemText">Convenience at your fingertips – check your health status whenever and wherever you need.</span>
            </div>
            <div className="whyItem">
                <GroupAddIcon className="whyIcon" />
                <span className="itemHead">Empowers Users to Take Control</span>
                <span className="itemText">OpenHealth empowers individuals to actively manage their health and well-being.</span>
            </div>
            <div className="whyItem">
                <TrendingDownIcon className="whyIcon" />
                <span className="itemHead">Reduces Healthcare Costs</span>
                <span className="itemText"> Minimize unnecessary medical visits and expenses with early detection.</span>
            </div>
            <div className="whyItem">
                <FavoriteIcon className="whyIcon" />
                <span className="itemHead">Improves Healthcare Efficiency</span>
                <span className="itemText">Contribute to a more efficient healthcare system by utilizing AI for preliminary health assessments.</span>
            </div>
            <div className="whyItem">
                <VisibilityIcon className="whyIcon" />
                <span className="itemHead">Early Detection of Health Issues</span>
                <span className="itemText">Detect potential health issues early, leading to more effective treatment.</span>
            </div>
            </div>

        </div>

        <div className="solutionContainer" id='howitwork'>
        <div className="solutionWrap">

            <h1 className="solutionTitle">How it Works</h1>

            <div className="solList">
            <div className="solItems">
                <div className="solContent">
                <span className="solHead">User Checking Symptoms</span>
                <span className="solText">Users are provided with educational information related to their symptoms</span>
                </div>
                <img src="/img/check-syp.webp" alt="solImg" className="solImg" />
            </div>
            <div className="solItems">
                <div className="solContent">
                <span className="solHead">Navigate to Hospital for Quick Treatment</span>
                <span className="solText">In critical situations, OpenHealth offers quick access to the nearest hospitals</span>
                </div>
                <img src="/img/geolocation.png" alt="solImg" className="solImg" />
            </div>
            <div className="solItems">
                <div className="solContent">
                <span className="solHead">Virtual Appointment with a Doctor</span>
                <span className="solText">Users can connect with their chosen healthcare professional through a secure video consultation</span>
                </div>
                <img src="/img/chat.png" alt="solImg" className="solImg" />
            </div>

            </div>

        </div>
        </div>
        
        <div className="aboutContainer" id='whyus'>
        <div className="aboutWrap">

            <h1 className="aboutTitle">Why OpenHealth</h1>

            <div className="abtList">
            <div className="abtItems">
                <div className="abtContent">
                <span className="abtHead">Take charge of your health with OpenHealth</span>
                <span className="abtText">At OpenHealth, we are committed to revolutionizing healthcare by making it accessible, affordable, and user-centric. Our team of experts combines their knowledge in healthcare and AI to create a state-of-the-art symptom checker that empowers individuals to take control of their well-being.</span>
                </div>
                <div className="abtFeature">
                <span className="feaText">AI-Powered Symptom Analysis</span>
                <span className="feaText">Real-time Health Insights</span>
                </div>
            </div>
                <img src="/img/hero.png" alt="abtImg" className="abtImg" />

            </div>

        </div>
        </div>

        <div className="callActionWrap">
        <div className="callAction">
        <img src="/img/download.webp" alt="call-action" className="callImg" />
        <div className="callContent">
        <span className="callTitle">Experience the convenience of having a virtual health assistant at your fingertips</span>
        <Link to={'/askai'} className="callBtn">Ask ai</Link>
        </div>
        </div>
        </div>

    <Footer/>
    </div>
  )
}

export default Home