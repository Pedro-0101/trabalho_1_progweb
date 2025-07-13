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
const EmprestimoService_1 = require("./EmprestimoService");
const dateUtils_1 = require("../utils/dateUtils");
class UsuarioService {
    constructor() {
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    }
    validaDadosUsuario(nome, cpf, ativo, categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categiriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
            const cursoService = new CursoService_1.CursoService();
            cpf = cpf.replace(/[^\d]/g, "");
            // Verificar se existe a categoria
            const categoriaUsuario = yield categiriaUsuarioService.getCategoriaUsuarioById(categoriaId);
            if (!categoriaUsuario)
                throw new Error('Categoria de usuario invalida');
            // Verifica se existe o curso
            const curso = yield cursoService.getCursoById(cursoId);
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
    getUsuarioById(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!usuarioId)
                throw new Error('Id do usuario invalido.');
            return this.usuarioRepository.getUsuarioById(usuarioId);
        });
    }
    getUsuarios(categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioRepository.getUsuarios(categoriaId, cursoId);
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
    deletarUsuario(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimoService = new EmprestimoService_1.EmprestimoService();
            // Verificar se exite usuario com o cpf
            cpf = cpf.replace(/[^\d]/g, "");
            if (!cpf)
                throw new Error('CPF invalido.');
            const usuario = yield this.getUsuarioByCpf(cpf);
            if (!usuario)
                throw new Error('CPF invalido.');
            // Verificar se usuario nao tem emprestimo aberto
            const emprestimosAbertos = yield emprestimoService.getListaEmprestimos(true, 0, usuario.id);
            if (emprestimosAbertos) {
                console.error('Usuario possui emprestimos em aberto.');
                return false;
            }
            return yield this.usuarioRepository.deletarUsuario(cpf);
        });
    }
    atualizarSuspensao(cpf, ativo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf)
                throw new Error('Cpf do usuario invalido.');
            if (!ativo)
                throw new Error('Status de usuario invalido.');
            return yield this.usuarioRepository.atualizarSuspensao(cpf, ativo);
        });
    }
    verificarEAtualizarStatusUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimoService = new EmprestimoService_1.EmprestimoService();
            const usuarios = yield this.usuarioRepository.getUsuarios();
            const hoje = new Date();
            for (const usuario of usuarios || []) {
                let novoStatus = null;
                // Buscar todos os empréstimos abertos do usuário
                const emprestimos = yield emprestimoService.getListaEmprestimos(true, usuario.id);
                if (!emprestimos || emprestimos.length === 0) {
                    // Sem empréstimos abertos, mantém ativo
                    continue;
                }
                // Pega o maior suspensao_ate dos empréstimos
                const maiorSuspensaoAte = emprestimos
                    .map(emp => emp.suspensaoAte)
                    .filter((dt) => dt !== null && dt !== undefined)
                    .reduce((max, dt) => (dt > max ? dt : max), new Date(0));
                // Se maior suspensão já passou, usuário fica ativo
                if (maiorSuspensaoAte && maiorSuspensaoAte < hoje) {
                    novoStatus = "Ativo";
                }
                else {
                    // Contar empréstimos com mais de 20 dias de atraso
                    const atrasosMais20Dias = emprestimos.filter(emp => {
                        const diasAtraso = dateUtils_1.DateUtils.diferencaDias(hoje, emp.dataDevolucao);
                        return diasAtraso > 20;
                    }).length;
                    if (atrasosMais20Dias >= 1) {
                        novoStatus = "Suspenso";
                    }
                    if (emprestimos.length >= 2) {
                        novoStatus = "Inativo";
                    }
                }
                // Atualiza status só se for diferente do atual
                if (novoStatus && usuario.ativo !== novoStatus) {
                    console.log(`Atualizando status do usuário ${usuario.cpf} de ${usuario.ativo} para ${novoStatus}`);
                    yield this.usuarioRepository.atualizarSuspensao(usuario.cpf, novoStatus);
                }
            }
        });
    }
}
exports.UsuarioService = UsuarioService;
