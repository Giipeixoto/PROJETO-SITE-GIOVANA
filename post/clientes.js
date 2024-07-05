const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    // Outros campos do cliente
});

const Cliente = require('../models/cliente');

// Exemplo de rota para salvar um cliente
app.post('/clientes', async (req, res) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }

    try {
        const novoCliente = new Cliente({ nome, email });
        await novoCliente.save();
        res.status(201).json(novoCliente);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
