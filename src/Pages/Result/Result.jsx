import './result.scss'
import PlaceIcon from '@mui/icons-material/Place';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Footer from '../../Components/Footer/Footer';
import { Link } from 'react-router-dom';


const Result = ({ result }) => {
  if (!result || JSON.stringify(result) === "{}") {
    console.log("serve error");
  }

  return (
    <div className="result">

      <div className='resultWrap'>
 
            <h1 className='resultTitle'>Hi {result.fullName}, Your health status!</h1>

        <div className='restHead'>
          <ResultSection
            title="Symptom Suggestion"
            content={result.symptomsCheck}
          />
          <ResultSection
            title="Possible Cause"
            content={result.causes}
          />
          <ResultSection
            title="What To Do Next"
            content={result.treatment}
          />
        </div>
        
      </div>

      

      <div className="callActionWrap">

        <div className="callAction">

        <div className="callContent">
        <h1 className="callTitle">Next Steps for a Healthier Tomorrow!</h1>
        <span className="callText">Ready for positive change? Uncover actionable steps to improve your well-being and live your healthiest life.</span>
        </div>

        <div className="options">
        <Link className="optionList" to={'https://www.google.com/maps/search/hospitals/@${latitude},${longitude},15z'} target='_blank'>
        <PlaceIcon className='fIcon'/>
        <div className='optionContent'>
        <span className="optionHead">Navigate to Hospital</span>
        <span className="optiontxt">Quick access to nearest hospitals</span>
        </div>
        <ArrowForwardIosIcon className='lIcon'/>
        </Link>
        <div className="optionList" onClick={() => alert("Coming Soon")}>
        <VideoCallIcon className='fIcon'/>
        <div className='optionContent'>
        <span className="optionHead">Virtual Appointment</span>
        <span className="optiontxt">Virtual consultation with doctor</span>
        </div>
        <ArrowForwardIosIcon className='lIcon'/>
        </div>
        <div className="optionList" onClick={() => alert("Coming Soon")}>
        <EmojiPeopleIcon className='fIcon'/>
        <div className='optionContent'>
        <span className="optionHead">Physical Appointment</span>
        <span className="optiontxt">Book appointment with your hospital</span>
        </div>
        <ArrowForwardIosIcon className='lIcon'/>
        </div>
        </div>
        </div>

        </div>
      <Footer/>
    </div>
  );
};

const ResultSection = ({ title, content }) => (
  <div className='restContent'>
    <h2 className='resTitle'>{title}</h2>
    <div
      className='restText'
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  </div>
  
);

export default Result;
