import './tool-detail.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../Components/ui/Container';
import Input from '../../Components/ui/Input';
import Button from '../../Components/ui/Button';
import Loading from '../../Components/Loading/Loading';
import EmergencyBanner from '../../Components/Nigeria/EmergencyBanner';
import Footer from '../../Components/Footer/Footer';
import { getHealthTool, runHealthTool } from '../../services/api';

const ToolDetail = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHealthTool(toolId)
      .then(({ data }) => {
        setTool(data.tool);
        const initial = {};
        data.tool.fields.forEach((f) => { initial[f.name] = ''; });
        setFormData(initial);
      })
      .catch(() => navigate('/tools'));
  }, [toolId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    tool.fields.forEach((f) => {
      if (f.required && !formData[f.name]?.trim()) {
        newErrors[f.name] = `${f.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await runHealthTool(toolId, formData);
      navigate(`/result/${data.sessionId}`);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Assessment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!tool) return <Loading />;
  if (loading) return <Loading />;

  return (
    <div className="tool-detail">
      <Container>
        <EmergencyBanner />
        <div className="tool-detail__header">
          <h1 className="tool-detail__title">{tool.title}</h1>
          <p className="tool-detail__desc">{tool.description}</p>
          <span className="tool-detail__problem">{tool.problem}</span>
        </div>

        {apiError && <div className="tool-detail__error">{apiError}</div>}

        <form className="tool-detail__form" onSubmit={handleSubmit}>
          {tool.fields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              id={field.name}
              name={field.name}
              as={field.type === 'textarea' ? 'textarea' : 'input'}
              type={field.type === 'textarea' ? undefined : field.type}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.label}
              error={errors[field.name]}
            />
          ))}
          <Button type="submit" variant="primary" size="lg">
            Get AI Assessment
          </Button>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default ToolDetail;
