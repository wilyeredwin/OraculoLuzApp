import React, { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('');

  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/test');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error al conectar con el backend');
    }
  };

  return (
    <div>
      <h1>Bienvenido a Oráculo Luz App</h1>
      <button onClick={testBackendConnection}>Probar conexión con el backend</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Home;
