import React, { useEffect, useState } from 'react';
import { obtenerCartas } from './api';
import ListaCartas from './components/ListaCartas';
import FormularioCarta from './components/FormularioCarta';

function App() {
  const [cartas, setCartas] = useState([]);

  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const data = await obtenerCartas();
        setCartas(data);
      } catch (error) {
        console.error('Error al cargar las cartas:', error);
      }
    };

    fetchCartas();
  }, []);

  const handleCartaAgregada = (nuevaCarta) => {
    setCartas((prevCartas) => [...prevCartas, nuevaCarta]);
  };

  return (
    <div>
      <h1>Gestión de Cartas</h1>
      <FormularioCarta onCartaAgregada={handleCartaAgregada} />
      <ListaCartas cartas={cartas} />
    </div>
  );
}

export default App;
