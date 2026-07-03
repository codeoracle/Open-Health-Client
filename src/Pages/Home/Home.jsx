import './home.scss';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DevicesIcon from '@mui/icons-material/Devices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Progress from '../../Components/Progress/Progress';
import Footer from '../../Components/Footer/Footer';
import Container from '../../Components/ui/Container';
import Button from '../../Components/ui/Button';
import SectionHeading from '../../Components/ui/SectionHeading';
import Card from '../../Components/ui/Card';
import FAQ from '../../Components/FAQ/FAQ';
import OutbreakAlerts from '../../Components/Nigeria/OutbreakAlerts';
import { getHealthTools } from '../../services/api';

const stats = [
  { value: 85, duration: 6000, label: 'People Seeking Healthcare' },
  { value: 52, duration: 6000, label: 'Doctor to Patient Ratio Gap' },
  { value: 21, duration: 3000, label: 'Patients Aware of Their Health Issue' },
  { value: 38, duration: 6000, label: 'Healthcare Center Availability' },
];

const benefits = [
  {
    icon: LocalHospitalIcon,
    title: 'Quick and Accurate Diagnosis',
    text: 'Receive rapid and reliable insights into your health status.',
  },
  {
    icon: DevicesIcon,
    title: 'Accessible Anytime, Anywhere',
    text: 'Check your health status whenever and wherever you need.',
  },
  {
    icon: GroupAddIcon,
    title: 'Empowers Users to Take Control',
    text: 'Actively manage your health and well-being with confidence.',
  },
  {
    icon: TrendingDownIcon,
    title: 'Reduces Healthcare Costs',
    text: 'Minimize unnecessary medical visits with early detection.',
  },
  {
    icon: FavoriteIcon,
    title: 'Improves Healthcare Efficiency',
    text: 'AI-powered preliminary assessments for a more efficient system.',
  },
  {
    icon: VisibilityIcon,
    title: 'Early Detection of Health Issues',
    text: 'Detect potential health issues early for more effective treatment.',
  },
];

const steps = [
  {
    step: 1,
    title: 'Describe Your Symptoms',
    text: 'Tell our AI about what you are experiencing and get educational information.',
    image: '/img/check-syp.webp',
  },
  {
    step: 2,
    title: 'Navigate to Hospital',
    text: 'In critical situations, get quick access to the nearest hospitals.',
    image: '/img/geolocation.png',
  },
  {
    step: 3,
    title: 'Virtual Doctor Appointment',
    text: 'Connect with healthcare professionals through secure video consultation.',
    image: '/img/chat.png',
  },
];

const Home = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getHealthTools()
      .then(({ data }) => setTools(data.tools.slice(0, 6)))
      .catch(() => {});
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section
        className="home__hero"
        style={{ backgroundImage: 'url(/img/home-page-background.webp)' }}
      >
        <div className="home__hero-overlay" />
        <Container>
          <div className="home__hero-content">
            <div className="home__hero-text">
              <span className="home__hero-badge">AI-Powered Health Companion</span>
              <h1 className="home__hero-title">
                Seamless Health at Your Fingertips
              </h1>
              <p className="home__hero-desc">
                Your health journey deserves a companion that never sleeps. OpenHealth
                is your 24/7 wellness wizard, offering continuous support whenever you need it.
              </p>
              <Link to="/askai">
                <Button variant="primary" size="lg">
                  Check Symptoms
                  <ArrowRightAltIcon />
                </Button>
              </Link>
            </div>
            <img
              src="/img/Picture1-1.png"
              alt="Health companion"
              className="home__hero-img"
            />
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="home__stats">
        <Container>
          <div className="home__stats-card">
            <h3 className="home__stats-title">
              Empowering Patients with Information to Navigate Health Choices
            </h3>
            <div className="home__stats-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="home__stat">
                  <Progress targetNumber={stat.value} duration={stat.duration} />
                  <span className="home__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="home__benefits" id="benefits">
        <Container>
          <SectionHeading
            title="Small change,"
            highlight="Big impact"
            subtitle="Access your health status at your convenience with OpenHealth, empowering you to take an active role in managing your well-being."
          />
          <div className="home__benefits-grid">
            {benefits.map(({ icon: Icon, title, text }) => (
              <Card key={title} hover className="home__benefit-card">
                <div className="home__benefit-icon-wrap">
                  <Icon className="home__benefit-icon" />
                </div>
                <h3 className="home__benefit-title">{title}</h3>
                <p className="home__benefit-text">{text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="home__steps" id="howitwork">
        <Container>
          <SectionHeading title="How it Works" />
          <div className="home__steps-list">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className={`home__step ${index % 2 !== 0 ? 'home__step--reverse' : ''}`}
              >
                <div className="home__step-content">
                  <span className="home__step-number">{item.step}</span>
                  <h3 className="home__step-title">{item.title}</h3>
                  <p className="home__step-text">{item.text}</p>
                </div>
                <img src={item.image} alt={item.title} className="home__step-img" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why OpenHealth */}
      <section className="home__about" id="whyus">
        <Container>
          <div className="home__about-layout">
            <div className="home__about-content">
              <h2 className="home__about-title">Why OpenHealth</h2>
              <p className="home__about-head">
                Take charge of your health with OpenHealth
              </p>
              <p className="home__about-text">
                We are committed to revolutionizing healthcare by making it accessible,
                affordable, and user-centric. Our team combines healthcare expertise and
                AI to create a symptom checker that empowers individuals.
              </p>
              <div className="home__about-features">
                <span className="home__about-feature">AI-Powered Symptom Analysis</span>
                <span className="home__about-feature">Real-time Health Insights</span>
              </div>
            </div>
            <img src="/img/hero.png" alt="OpenHealth platform" className="home__about-img" />
          </div>
        </Container>
      </section>

      {/* Nigeria Health Tools */}
      <section className="home__tools" id="tools">
        <Container>
          <SectionHeading
            title="Built for"
            highlight="Nigeria's Health Challenges"
            subtitle="AI tools targeting the biggest health gaps — maternal mortality, child deaths, sickle cell, HIV, snake bites, and more."
          />
          <OutbreakAlerts />
          <div className="home__tools-grid">
            {tools.map((tool) => (
              <Card key={tool.id} hover className="home__tool-card">
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <Link to={`/tools/${tool.id}`}>
                  <Button variant="outline" size="sm">Check Now</Button>
                </Link>
              </Card>
            ))}
          </div>
          <div className="home__tools-cta">
            <Link to="/tools"><Button variant="primary">View All 10 Health Tools</Button></Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <Container>
        <FAQ />
      </Container>

      {/* CTA */}
      <section className="home__cta">
        <Container>
          <div className="home__cta-inner">
            <img src="/img/download.webp" alt="" className="home__cta-img" />
            <div className="home__cta-content">
              <h2 className="home__cta-title">
                Experience the convenience of a virtual health assistant
              </h2>
              <Link to="/askai">
                <Button variant="white" size="lg">Check Symptoms Now</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
