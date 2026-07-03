import './tools.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SpaIcon from '@mui/icons-material/Spa';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Container from '../../Components/ui/Container';
import SectionHeading from '../../Components/ui/SectionHeading';
import EmergencyBanner from '../../Components/Nigeria/EmergencyBanner';
import OutbreakAlerts from '../../Components/Nigeria/OutbreakAlerts';
import ImmunizationSchedule from '../../Components/Nigeria/ImmunizationSchedule';
import PHCFinder from '../../Components/Nigeria/PHCFinder';
import Footer from '../../Components/Footer/Footer';
import { getHealthTools } from '../../services/api';

const iconMap = {
  pregnant_woman: PregnantWomanIcon,
  child_care: ChildCareIcon,
  bloodtype: BloodtypeIcon,
  psychology: PsychologyIcon,
  medication: MedicationIcon,
  health_and_safety: HealthAndSafetyIcon,
  restaurant: RestaurantIcon,
  emergency: ReportProblemIcon,
  menu_book: MenuBookIcon,
  spa: SpaIcon,
};

const Tools = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    getHealthTools()
      .then(({ data }) => setTools(data.tools))
      .catch(() => {});
  }, []);

  return (
    <div className="tools-page">
      <Container>
        <EmergencyBanner />
        <SectionHeading
          title="Nigeria Health"
          highlight="AI Tools"
          subtitle="10 specialized AI checkers for Nigeria's biggest health challenges — from maternal mortality to snake bites and herbal medicine safety."
        />

        <OutbreakAlerts />

        <div className="tools-page__grid">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon] || MedicationIcon;
            return (
              <Link key={tool.id} to={`/tools/${tool.id}`} className="tools-page__card">
                <Icon className="tools-page__icon" />
                <div className="tools-page__content">
                  <h3 className="tools-page__title">{tool.title}</h3>
                  <p className="tools-page__desc">{tool.description}</p>
                  <span className="tools-page__problem">{tool.problem}</span>
                </div>
                <ArrowForwardIosIcon className="tools-page__arrow" />
              </Link>
            );
          })}
        </div>

        <PHCFinder />
        <ImmunizationSchedule />
      </Container>
      <Footer />
    </div>
  );
};

export default Tools;
