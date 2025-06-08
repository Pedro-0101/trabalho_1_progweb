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
const UsuarioController_1 = require("../controller/UsuarioController");
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
/*
* POST / - Cadastra novo usuário
    * Campos obrigatórios: nome, CPF, email, categoria, curso. Considere que o cliente da API sempre enviará um CPF numérico (sem traços ou ponto).
* GET / - Lista todos os usuários (com filtros opcionais).
* GET /:cpf - Retorna detalhes de um usuário específico.
* PUT /:cpf - Atualiza dados do usuário.
* DELETE /:cpf - Remove usuário (se não tiver empréstimos)
*/
// Rota para cadastrar novo usuario
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioController = new UsuarioController_1.UsuarioController();
        const novoUsuario = yield usuarioController.cadastrarUsuario(req);
        res.status(200).json(novoUsuario);
    }
    catch (error) {
        throw new Error("Erro ao cadastrar novo usuario");
    }
}));
// Rota para listar usuarios, com filtro
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioController = new UsuarioController_1.UsuarioController();
        const listaUsuarios = yield usuarioController.listaUsuariosFiltro(req);
        res.status(200).json(listaUsuarios);
    }
    catch (error) {
        throw new Error("Erro ao listar funcionarios");
    }
}));
// Rota para retornar detalhes de um usuario
router.get('/:cpf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioController = new UsuarioController_1.UsuarioController();
        const usuario = yield usuarioController.getUsuario(req.body.cpf);
        res.status(200).json(usuario);
    }
    catch (error) {
        throw new Error("Erro ao retornar detalhes do funcionario");
    }
}));
// Rota para atualizar detalhes de um usuario
router.put('/:cpf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioController = new UsuarioController_1.UsuarioController();
        const usuarioAtualizado = yield usuarioController.atualizaUsuario(req);
        res.status(200).json(usuarioAtualizado);
    }
    catch (error) {
        throw new Error("Erro ao atualizar funcionario");
    }
}));
// Rota para remover usuario
router.delete('/:cpf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioController = new UsuarioController_1.UsuarioController();
        yield usuarioController.removeFuncionario(req.body.cpf);
        res.status(200);
    }
    catch (error) {
        throw new Error("Erro ao remover detalhes do funcionario");
    }
}));
module.exports = router;
