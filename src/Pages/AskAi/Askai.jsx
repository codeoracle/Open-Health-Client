import './askai.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import Footer from '../../Components/Footer/Footer';

const Askai = ({ setResult }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    symptoms: '',
    ageRange: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5250/symptoms/askai', formData);

      if (response.status === 200) {
        const responseData = response.data;

        if (responseData.message) {
          setResult(responseData.data);
          console.log(responseData.data);
          navigate('/result');
        } else {
          console.error('Unexpected response from the server:', responseData);
        }
      } else {
        console.error('Unexpected status code from the server:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="askai">
      <div className="askaiCointainer">
        <div className="askaiWrap">
          <div className="askContent">
            <h1 className="askTitle">OpenHealth AI Symptoms Checker</h1>
            <p className="askContent">Empowering you to take an active role in managing your well-being</p>
          </div>

          <form className="formWrap" onSubmit={handleFormSubmit}>
            <div className="formItemInp">
              <label htmlFor="fullName" className="formLab">
                Full Name
              </label>
              <input
                type="text"
                required
                name="fullName"
                id="fullName"
                className="formInp"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your Name"
              />
            </div>

            <div className="formItemInp">
              <label htmlFor="symptoms" className="formLab">
                Symptoms
              </label>
              <input
                type="text"
                required
                name="symptoms"
                className="formInp"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="Symptoms"
              />
            </div>

            <div className="formItemsWrap">
              <div className="formItemAge">
                <label htmlFor="ageRange" className="formLab">
                  Age
                </label>
                <input
                  type="number"
                  min={1}
                  name="ageRange"
                  placeholder="Age"
                  className="formInpAge"
                  value={formData.ageRange}
                  onChange={handleInputChange}
                />
              </div>
              <div className="formItemGen">
                <label htmlFor="gender" className="formLab">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="formInpGen"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <option value="0" className="formInpGenLab">
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <button className="heroBtn" type="submit">
              CHECK SYMPTOMS
            </button>
          </form>
        </div>
      </div>

      <div className="footerWrap">
        <Footer />
      </div>
    </div>
  );
};

export default Askai;
