import './askai.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import Footer from '../../Components/Footer/Footer';
import Container from '../../Components/ui/Container';
import Input from '../../Components/ui/Input';
import Button from '../../Components/ui/Button';
import SectionHeading from '../../Components/ui/SectionHeading';
import EmergencyBanner from '../../Components/Nigeria/EmergencyBanner';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { checkSymptoms } from '../../services/api';

const Askai = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    symptoms: '',
    ageRange: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.symptoms.trim()) newErrors.symptoms = 'Please describe your symptoms';
    if (!formData.ageRange || formData.ageRange < 1) newErrors.ageRange = 'Please enter a valid age';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await checkSymptoms(formData);

      if (data.sessionId) {
        navigate(`/result/${data.sessionId}`);
      } else {
        setApiError('Unexpected response from the server. Please try again.');
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          'Unable to reach the server. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="askai">
      <Container>
        <EmergencyBanner />
        <div className="askai__layout">
          <div className="askai__info">
            <SectionHeading
              align="left"
              title="OpenHealth AI"
              highlight="Symptom Checker"
              subtitle="Empowering you to take an active role in managing your well-being."
            />

            <div className="askai__trust">
              <div className="askai__trust-item">
                <LocalHospitalIcon className="askai__trust-icon" />
                <div>
                  <strong>AI-Powered Analysis</strong>
                  <p>Get preliminary insights based on your symptoms</p>
                </div>
              </div>
              <div className="askai__trust-item">
                <SecurityIcon className="askai__trust-icon" />
                <div>
                  <strong>Private & Secure</strong>
                  <p>Your health information stays confidential</p>
                </div>
              </div>
              <div className="askai__trust-item">
                <SpeedIcon className="askai__trust-icon" />
                <div>
                  <strong>Fast Results</strong>
                  <p>Receive guidance in seconds, not hours</p>
                </div>
              </div>
            </div>

            <img
              src="/img/phone-girl-FI-spring20.jpeg"
              alt="Health consultation"
              className="askai__illustration"
            />
          </div>

          <div className="askai__form-panel">
            <h2 className="askai__form-title">Tell us how you feel</h2>
            <p className="askai__form-subtitle">Step 1 of 1 — Symptom assessment</p>

            {apiError && (
              <div className="askai__api-error" role="alert">
                {apiError}
              </div>
            )}

            <form className="askai__form" onSubmit={handleFormSubmit} noValidate>
              <Input
                label="Full Name"
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                error={errors.fullName}
              />

              <Input
                label="Symptoms"
                id="symptoms"
                name="symptoms"
                as="textarea"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="Describe your symptoms (e.g. headache, fever, cough)"
                error={errors.symptoms}
              />

              <div className="askai__form-row">
                <Input
                  label="Age"
                  id="ageRange"
                  name="ageRange"
                  type="number"
                  min={1}
                  max={120}
                  value={formData.ageRange}
                  onChange={handleInputChange}
                  placeholder="Your age"
                  error={errors.ageRange}
                />
                <Input
                  label="Gender"
                  id="gender"
                  name="gender"
                  as="select"
                  value={formData.gender}
                  onChange={handleInputChange}
                  error={errors.gender}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
              </div>

              <Button type="submit" variant="primary" size="lg" className="askai__submit">
                Check Symptoms
              </Button>

              <p className="askai__disclaimer">
                This tool provides general health information only and is not a substitute for
                professional medical advice.
              </p>
            </form>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Askai;
