const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Cliente = require('../models/Cliente'); // Substitua pelo caminho correto do seu modelo de Cliente

passport.use(new LocalStrategy({
    usernameField: 'email', // Campo usado como username
    passwordField: 'password' // Campo usado como password
  },
  async (email, password, done) => {
    try {
      const cliente = await Cliente.findOne({ email });

      if (!cliente) {
        return done(null, false, { message: 'Usuário não encontrado' });
      }

      const isMatch = await bcrypt.compare(password, cliente.password);

      if (isMatch) {
        return done(null, cliente);
      } else {
        return done(null, false, { message: 'Senha incorreta' });
      }
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize and deserialize user for session management (optional for JWT)
passport.serializeUser((cliente, done) => {
  done(null, cliente.id);
});

passport.deserializeUser((id, done) => {
  Cliente.findById(id, (err, cliente) => {
    done(err, cliente);
  });
});

module.exports = passport;
