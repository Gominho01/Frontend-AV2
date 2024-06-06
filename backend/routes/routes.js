// routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const servicosTIController = require('../controllers/servicosController');
const solicitacoesController = require('../controllers/solicitacoesController');
const clienteController = require('../controllers/clienteController');

// Rotas de autenticação
router.post('/login', (request, response) =>
    authController.autenticacao(request, response)
);

// Rotas de Clientes
router.put('/trocar-senha',(request, response) => 
    clienteController.trocarSenha(request, response)
);

router.post('/clientes', (request, response) =>
    clienteController.cadastrarCliente(request, response)
);

router.get('/clientes', (request, response) =>
    clienteController.buscarTodosClientes(request, response)
);

// Rotas de serviços de TI
router.post('/servicos', (request, response) =>
    servicosTIController.cadastrarServico(request, response)
);

router.get('/servicos', (request, response) =>
    servicosTIController.consultarServicos(request, response)
);

// Rotas de solicitações de serviços de TI
router.get('/solicitacoes/:email',(request, response) =>
    solicitacoesController.lerSolicitacoes(request, response)
);

router.put('/solicitacoes/:email', (request, response) =>
    solicitacoesController.atualizarSolicitacoes(request, response)
);

module.exports = router;
