// Clientes.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('/api/clientes')
      .then(res => {
        setClientes(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar clientes:', err);
      });
  }, []);

  return (
    <div>
      <h2>Nossos Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente._id}>
            <a href={`/clientes/${cliente._id}`}>{cliente.nome}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clientes;
