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
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../model/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const UsuarioService_1 = require("./UsuarioService");
const dateUtils_1 = require("../utils/dateUtils");
class EmprestimoService {
    constructor() {
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
        this.estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
        this.livroRepository = LivroRepository_1.LivroRepository.getInstance();
        this.CategoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    }
    registrarEmprestimo(cpf, codigoExemplar, dataEmprestimo) {
        var _a, _b, _c, _d;
        // Verifica se o usuário existe
        const usuario = this.usuarioRepository.getListaUsuarios().find(u => u.cpf === cpf);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
        // Verifica se o usuário está ativo
        if (!usuario.ativo) {
            throw new Error("Usuário inativo.");
        }
        // Verifica se o estoque existe
        const estoque = this.estoqueRepository.getListaEstoques().find(e => e.id === codigoExemplar);
        if (!estoque) {
            throw new Error("Estoque não encontrado.");
        }
        // Verifica se o estoque está disponível
        if (!estoque.disponivel) {
            throw new Error("Estoque indisponível.");
        }
        // Valida a data de empréstimo
        if (!(dataEmprestimo instanceof Date)) {
            throw new Error("Data de empréstimo inválida.");
        }
        // Define variáveis para data de devolução, curso do usuário, categoria do usuário e categoria do livro
        let dataDevolucao = new Date(dataEmprestimo);
        let cursoUsuario = (_a = this.usuarioRepository.getUsuarioById(usuario.id)) === null || _a === void 0 ? void 0 : _a.nome;
        let categoriaUsuario = (_b = this.usuarioRepository.getUsuarioById(usuario.id)) === null || _b === void 0 ? void 0 : _b.categoriaId;
        let livroId = (_c = this.estoqueRepository.getEstoqueByLivroId(usuario.id)) === null || _c === void 0 ? void 0 : _c.livroId;
        let categoriaLivro = undefined;
        if (livroId !== undefined) {
            categoriaLivro = (_d = this.CategoriaLivroRepository.getCategoriaLivroById(livroId)) === null || _d === void 0 ? void 0 : _d.nome;
        }
        // Calcula data de devolucao
        if (categoriaUsuario === 1) { // Categoria professor, emprestimo de 40 dias
            dataDevolucao.setDate(dataEmprestimo.getDate() + 40);
        }
        if (cursoUsuario === categoriaLivro) {
            dataDevolucao.setDate(dataEmprestimo.getDate() + 30); // Se o curso do usuário for o mesmo do livro, emprestimo de 30 dias
        }
        else {
            dataDevolucao.setDate(dataEmprestimo.getDate() + 15); // Categoria aluno, livro de outro curso, emprestimo de 15 dias
        }
        // Verfica numero de empréstimos do usuário em andamento
        let emprestimosEmAberto = this.emprestimoRepository.emprestimosEmAberto(usuario.id);
        if (categoriaUsuario === 1 && emprestimosEmAberto >= 5) { // Categoria professor, máximo de 5 empréstimos em aberto
            throw new Error("Limite de empréstimos em aberto atingido para usuários da categoria professor.");
        }
        if (categoriaUsuario === 2 && emprestimosEmAberto >= 3) { // Categoria aluno, máximo de 3 empréstimos em aberto
            throw new Error("Limite de empréstimos em aberto atingido para usuários da categoria aluno.");
        }
        /*      Passou em todas validacoes      */
        // Cria o empréstimo
        let id = this.emprestimoRepository.getListaEmprestimos().length + 1;
        let emprestimo = new Emprestimo_1.Emprestimo(id, usuario.id, estoque.id, dataEmprestimo, dataDevolucao, null, 0, null);
        // Adiciona o empréstimo ao repositório
        this.emprestimoRepository.addEmprestimo(emprestimo);
        // Atualiza a quantidade emprestada no estoque
        this.estoqueRepository.atualizarQuantidadeEmprestada(estoque.livroId, 1);
        return emprestimo;
    }
    listarEmprestimos() {
        return this.emprestimoRepository.getListaEmprestimos();
    }
    registrarDevolucao(id) {
        // Busca o empréstimo pelo ID
        const emprestimo = this.emprestimoRepository.getEmprestimoById(id);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }
        // Verifica se o empréstimo já foi devolvido
        if (emprestimo.dataDevolucao) {
            throw new Error("Empréstimo já foi devolvido.");
        }
        // Registra a devolução
        emprestimo.dataDevolucao = new Date();
        emprestimo.diasAtraso = dateUtils_1.DateUtils.diferencaDias(new Date(), emprestimo.dataEntrega);
        // Calcula suspensao se atrasado
        if (emprestimo.diasAtraso > 0) {
            emprestimo.suspensaoAte = dateUtils_1.DateUtils.somaData(new Date(), emprestimo.diasAtraso);
        }
        // Atualiza o status do estoque para disponível
        const estoque = this.estoqueRepository.getEstoqueById(emprestimo.estoqueId);
        if (!estoque) {
            throw new Error("Estoque não encontrado.");
        }
        this.estoqueRepository.atualizarQuantidadeEmprestada(estoque.livroId, -1);
        this.verificarEmprestimos();
        return emprestimo;
    }
    qtdeEmprestada(estoqueId) {
        return this.emprestimoRepository.qtdeEmprestada(estoqueId);
    }
    emprestimosEmAbertoUsuario(usuarioId) {
        const empAbertos = this.emprestimoRepository.emprestimosEmAberto(usuarioId);
        return empAbertos;
    }
    verificarEmprestimos() {
        return __awaiter(this, void 0, void 0, function* () {
            const emprestimosEmAberto = this.listarEmprestimos();
            emprestimosEmAberto.filter(e => !e.dataEntrega);
            emprestimosEmAberto.filter(e => e.dataDevolucao > new Date());
            emprestimosEmAberto.forEach(e => {
                console.log(`Emprestimo em atraso ${e.id}, usuario ${e.usuarioId}`);
                let us = new UsuarioService_1.UsuarioService();
                us.alteraStatusUsuario(e.usuarioId, false);
            });
        });
    }
}
exports.EmprestimoService = EmprestimoService;
