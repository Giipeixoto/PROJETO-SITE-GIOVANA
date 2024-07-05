const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Roteador do dashboard
const path = require('path');
const flash = require('connect-flash');

// Inicialização do Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON e URL encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do express-session
app.use(session({
  secret: 'sua_chave_secreta_aqui',
  resave: false,
  saveUninitialized: false
}));

// Configuração do connect-flash
app.use(flash());

// Configuração do Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/advocacia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB conectado...');
})
.catch(err => console.error('Erro de conexão com o MongoDB:', err));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas usando auth
app.use('/auth', authRoutes); // Prefixo '/auth' para todas as rotas em auth
app.use('/', dashboardRoutes); // Adicione as rotas do dashboard

// Middleware para lidar com erros de rota não encontrada
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// Middleware para lidar com erros internos do servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
