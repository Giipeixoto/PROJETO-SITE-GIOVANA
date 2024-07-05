// ClienteDetalhe.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ClienteDetalhe() {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    axios.get(`/api/clientes/${id}`)
      .then(res => {
        setCliente(res.data);
      })
      .catch(err => {
        console.error('Erro ao buscar cliente:', err);
      });
  }, [id]);

  if (!cliente) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Detalhes do Cliente</h2>
      <p><strong>Nome:</strong> {cliente.nome}</p>
      <p><strong>Email:</strong> {cliente.email}</p>
      <p><strong>Telefone:</strong> {cliente.telefone}</p>
      {/* Outras informações do cliente */}
    </div>
  );
}

export default ClienteDetalhe;
