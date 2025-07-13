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
const Emprestimo_1 = require("../model/entity/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueService_1 = require("./EstoqueService");
const LivroService_1 = require("./LivroService");
const UsuarioService_1 = require("./UsuarioService");
class EmprestimoService {
    constructor() {
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
        this.estoqueService = new EstoqueService_1.EstoqueService();
        this.usuarioService = new UsuarioService_1.UsuarioService();
        this.livroService = new LivroService_1.LivroService();
    }
    registrarEmprestimo(cpf, codigoExemplar, dataEmprestimo) {
        return __awaiter(this, void 0, void 0, function* () {
            // Busca usuário e valida
            const usuario = yield this.usuarioService.getUsuarioByCpf(cpf);
            if (!usuario)
                throw new Error("Usuário não encontrado.");
            if (usuario.ativo == "Inativo")
                throw new Error("Usuário inativo.");
            if (usuario.ativo == "Suspenso")
                throw new Error("Usuário suspenso.");
            // Busca estoque e valida
            const estoque = yield this.estoqueService.getEstoqueByLivroId(codigoExemplar);
            if (!estoque)
                throw new Error("Estoque não encontrado.");
            if (!estoque.disponivel)
                throw new Error("Estoque indisponível.");
            // Busca categoria usuário e categoria livro
            const categoriaUsuario = usuario.categoriaId;
            const livro = yield this.livroService.getLivroById(estoque.livroId);
            if (!livro)
                throw new Error("Livro não encontrado para este estoque.");
            // Calcula data devolução
            const categoriaLivro = livro.categoriaId;
            let dataDevolucao = new Date(dataEmprestimo);
            if (categoriaUsuario === 1) { // professor
                dataDevolucao.setDate(dataEmprestimo.getDate() + 40);
            }
            else if (usuario.cursoId === categoriaLivro) {
                dataDevolucao.setDate(dataEmprestimo.getDate() + 30);
            }
            else {
                dataDevolucao.setDate(dataEmprestimo.getDate() + 15);
            }
            // Verifica limite de empréstimos abertos
            const emprestimosEmAberto = yield this.emprestimoRepository.emprestimosEmAberto(usuario.id);
            if (categoriaUsuario === 1 && emprestimosEmAberto >= 5) {
                throw new Error("Limite de empréstimos em aberto atingido para professores.");
            }
            if (categoriaUsuario === 2 && emprestimosEmAberto >= 3) {
                throw new Error("Limite de empréstimos em aberto atingido para alunos.");
            }
            // Cria empréstimo (id fica 0 antes de inserir)
            const emprestimoTemp = new Emprestimo_1.Emprestimo(usuario.id, estoque.id, dataEmprestimo, dataDevolucao, null, null, null, 0);
            // Persiste empréstimo e pega id gerado
            const id = yield this.emprestimoRepository.insertEmprestimo(emprestimoTemp);
            // Atualiza quantidade emprestada no estoque
            yield this.estoqueService.atualizarQuantidadeEmprestada(estoque.livroId, 1);
            // Retorna instância final com id preenchido
            return new Emprestimo_1.Emprestimo(usuario.id, estoque.id, dataEmprestimo, dataDevolucao, null, null, null, id);
        });
    }
}
exports.EmprestimoService = EmprestimoService;
