import axios from 'axios';

const API_URL = 'http://localhost:5000/api/email';

export const saveEmailToHistory = async (emailData) => {
  const response = await axios.post(`${API_URL}/save`, emailData);
  return response.data;
};

export const getEmailHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export const deleteEmail = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
