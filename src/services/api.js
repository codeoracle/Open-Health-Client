import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5400';

const api = axios.create({ baseURL: API_BASE_URL });

export const checkSymptoms = (data) =>
  api.post('/symptoms/askai', data);

export const getSession = (sessionId) =>
  api.get(`/symptoms/${sessionId}`);

export const sendChatMessage = (sessionId, message) =>
  api.post(`/symptoms/${sessionId}/chat`, { message });

export const getSessionHistory = (limit = 20) =>
  api.get('/symptoms', { params: { limit } });

export const getNigeriaEmergency = () =>
  api.get('/nigeria/emergency');

export const getNigeriaConditions = () =>
  api.get('/nigeria/conditions');

export const getNigeriaResources = () =>
  api.get('/nigeria/resources');

export const getNigeriaTips = (count = 3) =>
  api.get('/nigeria/tips', { params: { count } });

export const getHealthTools = () =>
  api.get('/tools');

export const getHealthTool = (toolId) =>
  api.get(`/tools/${toolId}`);

export const runHealthTool = (toolId, data) =>
  api.post(`/tools/${toolId}`, data);

export const getOutbreakAlerts = () =>
  api.get('/nigeria/outbreaks');

export const getImmunizationSchedule = () =>
  api.get('/nigeria/immunization');

export const getPHCStates = () =>
  api.get('/nigeria/phc');

export const getPHCByState = (state) =>
  api.get('/nigeria/phc', { params: { state } });

export default api;
