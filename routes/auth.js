const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Rota de registro
router.post('/register', async (req, res) => {
  // Implementação do registro aqui...
});

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Verificação da senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Redirecionamento com base no tipo de usuário
    if (user.role === 'cliente') {
      res.json({ role: 'cliente' });
    } else if (user.role === 'advogado') {
      res.json({ role: 'advogado' });
    } else {
      res.status(400).json({ msg: 'Tipo de usuário não suportado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;
