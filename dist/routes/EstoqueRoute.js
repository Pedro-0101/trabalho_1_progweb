"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EstoqueController_1 = require("../controller/EstoqueController");
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
/*
*   POST / - Cadastra novo exemplar
    *   Campos obrigatórios: ISBN livro, código exemplar
*   GET / - Lista exemplares com disponibilidade.
*   GET /:codigo - Detalhes do exemplar.
*   PUT /:codigo - Atualiza disponibilidade.
*   DELETE /:codigo - Remove exemplar (se não estiver emprestado).
*/
// Rota para cadastrar um novo exemplar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estoqueController = new EstoqueController_1.EstoqueController();
    try {
        const novoExemplar = yield estoqueController.registrarEstoque(req, res);
        res.status(201).json(novoExemplar);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar exemplar', error });
    }
}));
// Rota para listar todos os exemplares com disponibilidade
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estoqueController = new EstoqueController_1.EstoqueController();
    try {
        const estoques = yield estoqueController.listarEstoque(req, res);
        res.status(200).json(estoques);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar exemplares', error });
    }
}));
// Rota para obter detalhes de um exemplar específico
router.get('/:codigo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estoqueController = new EstoqueController_1.EstoqueController();
    const codigo = Number(req.params.codigo);
    try {
        const estoque = yield estoqueController.getByCodigo(codigo);
        if (estoque) {
            res.status(200).json(estoque);
        }
        else {
            res.status(404).json({ message: 'Exemplar não encontrado' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar exemplar', error });
    }
}));
// Rota para atualizar a disponibilidade de um exemplar
router.put('/:codigo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estoqueController = new EstoqueController_1.EstoqueController();
    const codigo = Number(req.params.codigo);
    try {
        const estoqueAtualizado = yield estoqueController.atualizaDisponibilidade(codigo);
        res.status(200).json(estoqueAtualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar exemplar', error });
    }
}));
// Rota para remover um exemplar
router.delete('/:codigo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const estoqueController = new EstoqueController_1.EstoqueController();
    const codigo = Number(req.params.codigo);
    try {
        yield estoqueController.deletarEstoque(codigo, res);
        // Se a remoção for bem-sucedida returna 204 No Content
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao remover exemplar', error });
    }
}));
module.exports = router;
