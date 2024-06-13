// routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
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

router.get('/clientes/:email', (request, response) =>
    clienteController.buscarClientePorEmail(request,response)
);

// Rotas de solicitações de serviços de TI
router.get('/solicitacoes/:email',(request, response) =>
    solicitacoesController.lerSolicitacoes(request, response)
);

router.get('/servicos', (request, response) =>
    solicitacoesController.lerServicos(request, response)
);

router.post('/criar-servicos', (request,response) =>
    solicitacoesController.criarServico(request, response)
);

router.delete('/solicitacoes/:id', (request, response) =>
    solicitacoesController.excluirSolicitacao(request,response));

router.post('/solicitacoes', (request, response) =>
    solicitacoesController.criarSolicitacao(request, response)
);

module.exports = router;
