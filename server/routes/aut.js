const express = require('express');
const router = express.Router();
const AutController = require('../controllers/autenticacao_controller');

router.post('/login', AutController.login);
router.post('/registro', AutController.registro);

router.use(AutController.checkToken);
router.get('/user', AutController.user);

module.exports = router;