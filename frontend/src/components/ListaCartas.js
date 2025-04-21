import React from 'react';

const ListaCartas = ({ cartas }) => {
  return (
    <div>
      <h2>Lista de Cartas</h2>
      <ul>
        {cartas.map((carta) => (
          <li key={carta.id}>
            <h3>{carta.nombre}</h3>
            <p>{carta.descripcion}</p>
            <img src={carta.imagen_url} alt={carta.nombre} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaCartas;
