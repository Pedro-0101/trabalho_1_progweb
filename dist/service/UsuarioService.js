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
    criarUsuario(nome, cpf, ativo, categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se existe a categoria
            const categoriaUsuario = yield this.categiriaUsuarioService.getCategoriaUsuarioById(categoriaId);
            if (!categoriaUsuario)
                throw new Error('Categoria de usuario invalida');
            // Verifica se existe o curso
            const curso = yield this.cursoService.getCursoById(cursoId);
            if (!curso)
                throw new Error('Categoria de usuario invalida.');
            // Cria instância temporária apenas para validar e padronizar dados
            const usuarioTemp = new Usuario_1.Usuario(nome, cpf, ativo, categoriaId, cursoId);
            // Persiste e obtém o ID gerado
            const id = yield this.usuarioRepository.insertUsuario(usuarioTemp);
            // Retorna nova instância imutável com o ID preenchido
            return new Usuario_1.Usuario(nome, cpf, ativo, categoriaId, cursoId, id);
        });
    }
    getUsuarioByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf)
                throw new Error('CPF invalido.');
            return this.usuarioRepository.getUsuarioByCpf(cpf);
        });
    }
}
exports.UsuarioService = UsuarioService;
