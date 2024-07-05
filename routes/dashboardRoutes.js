const express = require('express');
const router = express.Router();

// Rota do dashboard
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

module.exports = router;
