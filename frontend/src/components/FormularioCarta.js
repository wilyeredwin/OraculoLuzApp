import React, { useState } from 'react';
import api from '../api';

const FormularioCarta = ({ onCartaAgregada }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevaCarta = await api.post('/cartas', formData);
      onCartaAgregada(nuevaCarta.data);
      setFormData({ nombre: '', descripcion: '', imagen_url: '' });
    } catch (error) {
      console.error('Error al agregar la carta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nueva Carta</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL de Imagen:</label>
        <input
          type="url"
          name="imagen_url"
          value={formData.imagen_url}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Carta</button>
    </form>
  );
};

export default FormularioCarta;
