"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmprestimoController_1 = require("../controller/EmprestimoController");
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
/*

* POST / - Registra novo empréstimo
    * Campos obrigatórios: CPF usuário, código exemplar.
    * Valida todas as regras de negócio.

* GET / - Lista todos os empréstimos (ativos/histórico).
* PUT /:id/devolucao - Registra devolução de livro.

*/
const emprestimoController = new EmprestimoController_1.EmprestimoController();
// Rota para registrar novo empréstimo
router.post('/', (req, res) => {
    emprestimoController.registrarEmprestimo(req, res);
    console.log('Registrando novo empréstimo');
});
// Rota para listar todos os empréstimos
router.get('/', (req, res) => {
    emprestimoController.listarEmprestimos(req, res);
    console.log('Listando todos os empréstimos');
});
// Rota para registrar devolução de livro
router.put('/:id/devolucao', (req, res) => {
    const id = req.params.id;
    emprestimoController.registrarDevolucao(req, res, id);
    console.log(`Registrando devolução do empréstimo com ID: ${id}`);
});
module.exports = router;
