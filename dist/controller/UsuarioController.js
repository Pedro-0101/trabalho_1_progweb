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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
class UsuarioController {
    constructor() {
        this.UsuarioController = new UsuarioController();
    }
    cadastrarUsuario(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioService = new UsuarioService_1.UsuarioService();
                const nome = req.body.nome;
                const cpf = req.body.cpf;
                const categoria = Number(req.body.categoria);
                const curso = Number(req.body.curso);
                const usuarioCadastrado = usuarioService.criarUsuario(nome, cpf, categoria, curso);
                if (usuarioCadastrado) {
                    return usuarioCadastrado;
                }
                else {
                    throw new Error("Erro ao cadastrar novo usuario");
                }
            }
            catch (error) {
                throw new Error("Erro ao cadastrar novo usuario");
            }
        });
    }
    listaUsuariosFiltro(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioService = new UsuarioService_1.UsuarioService();
                const categoria = req.body.categoria;
                const curso = req.body.curso;
                const listaUsuarios = usuarioService.listaUsuariosFiltro(categoria, curso);
                if (listaUsuarios) {
                    return listaUsuarios;
                }
                else {
                    throw new Error("Erro ao listar usuarios");
                }
            }
            catch (error) {
                throw new Error("Erro ao listar usuarios");
            }
        });
    }
    getUsuario(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioService = new UsuarioService_1.UsuarioService();
                const usuario = usuarioService.getUsuarioByCpf(cpf);
                if (usuario) {
                    return usuario;
                }
                else {
                    throw new Error("Usuario nao encontrado");
                }
            }
            catch (error) {
                throw new Error("Erro ao requisitar usuario");
            }
        });
    }
    atualizaUsuario(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioService = new UsuarioService_1.UsuarioService();
                const nome = req.body.nome;
                const cpf = req.body.cpf;
                const categoria = Number(req.body.categoria);
                const curso = Number(req.body.curso);
                const usuarioAtualizado = usuarioService.atualizaUsuario(nome, cpf, categoria, curso);
                return usuarioAtualizado;
            }
            catch (error) {
                throw new Error("Erro ao cadastrar novo usuario");
            }
        });
    }
    removeFuncionario(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioService = new UsuarioService_1.UsuarioService();
                usuarioService.removeUsuario(cpf);
            }
            catch (error) {
                throw new Error("Erro ao remover usuario");
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
