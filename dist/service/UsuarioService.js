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
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/entity/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioService_1 = require("./CategoriaUsuarioService");
const CursoService_1 = require("./CursoService");
class UsuarioService {
    constructor() {
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
        this.categiriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
        this.cursoService = new CursoService_1.CursoService();
    }
    validaDadosUsuario(nome, cpf, ativo, categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            cpf = cpf.replace(/[^\d]/g, "");
            // Verificar se existe a categoria
            const categoriaUsuario = yield this.categiriaUsuarioService.getCategoriaUsuarioById(categoriaId);
            if (!categoriaUsuario)
                throw new Error('Categoria de usuario invalida');
            // Verifica se existe o curso
            const curso = yield this.cursoService.getCursoById(cursoId);
            if (!curso)
                throw new Error('Curso invalido.');
            // Cria instância temporária apenas para validar e padronizar dados
            const usuarioTemp = new Usuario_1.Usuario(nome, cpf, ativo, categoriaId, cursoId);
            return usuarioTemp;
        });
    }
    criarUsuario(nome, cpf, ativo, categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioValidado = yield this.validaDadosUsuario(nome, cpf, ativo, categoriaId, cursoId);
            // Verifica se existe o cpf
            const usuarioRepetido = yield this.getUsuarioByCpf(usuarioValidado.cpf);
            if (usuarioRepetido)
                throw new Error('Cpf invalido, cpf ja cadastrado.');
            // Persiste e obtém o ID gerado
            const id = yield this.usuarioRepository.insertUsuario(usuarioValidado);
            // Retorna nova instância imutável com o ID preenchido
            return new Usuario_1.Usuario(nome, cpf, ativo, categoriaId, cursoId, id);
        });
    }
    getUsuarioByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            cpf = cpf.replace(/[^\d]/g, "");
            if (!cpf)
                throw new Error('CPF invalido.');
            return this.usuarioRepository.getUsuarioByCpf(cpf);
        });
    }
    getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioRepository.getUsuarios();
        });
    }
    atualizarUsuario(nome, cpf, ativo, categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            cpf = cpf.replace(/[^\d]/g, "");
            const usuario = yield this.getUsuarioByCpf(cpf);
            if (!usuario)
                throw new Error('CPF invalido.');
            const usuarioAtualizado = yield this.validaDadosUsuario(nome, cpf, ativo, categoriaId, cursoId);
            return yield this.usuarioRepository.atualizarUsuario(usuarioAtualizado.nome, usuarioAtualizado.cpf, usuarioAtualizado.ativo, usuarioAtualizado.categoriaId, usuarioAtualizado.cursoId);
        });
    }
}
exports.UsuarioService = UsuarioService;
