import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL base del backend
});

export const obtenerCartas = async () => {
  try {
    const response = await api.get('/cartas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las cartas:', error);
    throw error;
  }
};

export default api;
