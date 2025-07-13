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
const dateUtils_1 = require("../utils/dateUtils");
const Emprestimo_1 = require("../model/entity/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueService_1 = require("./EstoqueService");
const LivroService_1 = require("./LivroService");
const UsuarioService_1 = require("./UsuarioService");
class EmprestimoService {
    constructor() {
        this.emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    }
    registrarEmprestimo(cpf, codigoExemplar) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioService = new UsuarioService_1.UsuarioService();
            const estoqueService = new EstoqueService_1.EstoqueService();
            const livroService = new LivroService_1.LivroService();
            const dataEmprestimo = new Date();
            // Busca usuário e valida
            const usuario = yield usuarioService.getUsuarioByCpf(cpf);
            if (!usuario)
                throw new Error("Usuário não encontrado.");
            if (usuario.ativo == "Inativo")
                throw new Error("Usuário inativo.");
            if (usuario.ativo == "Suspenso")
                throw new Error("Usuário suspenso.");
            // Busca estoque e valida ***Rever essa validacao***
            const estoque = yield estoqueService.getEstoqueByLivroId(codigoExemplar);
            if (!estoque)
                throw new Error("Estoque não encontrado.");
            if (!estoque.disponivel)
                throw new Error("Estoque indisponível.");
            // Busca categoria usuário e categoria livro
            const categoriaUsuario = usuario.categoriaId;
            const livro = yield livroService.getLivroById(estoque.livroId);
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
            yield estoqueService.atualizarQuantidadeEmprestada(estoque.livroId, 1);
            // Retorna instância final com id preenchido
            return new Emprestimo_1.Emprestimo(usuario.id, estoque.id, dataEmprestimo, dataDevolucao, null, null, null, id);
        });
    }
    getListaEmprestimos(ativo, estoqueId, usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (ativo) {
                return yield this.emprestimoRepository.getListaEmprestimosEmAberto(estoqueId, usuarioId);
            }
            else {
                return yield this.emprestimoRepository.getListaEmprestimosFechados(estoqueId, usuarioId);
            }
        });
    }
    getEmprestimoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                throw new Error('Id de emprestimo invalido.');
            return yield this.emprestimoRepository.getEmprestimoById(id);
        });
    }
    static calcularSuspensao(dataDevolucao, dataEntrega) {
        if (!dataDevolucao || !dataEntrega)
            throw new Error('Data de devolucao ou data de entrega invalida.');
        const diasAtraso = dateUtils_1.DateUtils.diferencaDias(dataEntrega, dataDevolucao);
        if (dataEntrega <= dataDevolucao) {
            return 0;
        }
        return diasAtraso;
    }
    registrarDevolucao(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioService = new UsuarioService_1.UsuarioService();
            const estoqueService = new EstoqueService_1.EstoqueService();
            if (!id)
                throw new Error('Id de emprestimo invalido.');
            const emprestimo = yield this.getEmprestimoById(id);
            if (!emprestimo)
                throw new Error('Emprestimo nao encontrado.');
            // Define data de devolucao
            const dataEntregaString = dateUtils_1.DateUtils.formatarData(new Date(), 'aaaa-mm-dd');
            const dataEntregaDate = dateUtils_1.DateUtils.parseDataFromString(dataEntregaString);
            console.log("dataDevolucao:", emprestimo.dataDevolucao);
            console.log("dataEntrega:", dataEntregaDate);
            // Calcula atraso
            const diasAtraso = EmprestimoService.calcularSuspensao(emprestimo.dataDevolucao, dataEntregaDate);
            const diasSuspensao = diasAtraso * 3;
            const suspensao_ate = dateUtils_1.DateUtils.somaData(dataEntregaDate, diasSuspensao);
            // Atualiza emprestimo
            const emprestimoAtualizado = yield this.emprestimoRepository.registraDevolucao(id, dataEntregaString, diasAtraso, suspensao_ate);
            if (!emprestimoAtualizado) {
                console.error(`Nao foi possivela registrar a devolucao do emprestimo ${id}.`);
                return null;
            }
            // Altera disponibilidade do exemplar
            const exemplar = yield estoqueService.getEstoqueById(emprestimo.estoqueId);
            if (!exemplar)
                throw new Error('Nao foi possivel encontrar exemplar do emprestimo');
            estoqueService.atualizarQuantidadeEmprestada(exemplar.livroId, -1);
            // Altera status do usuario caso tenha atraso
            if (diasSuspensao != 0) {
                const usuario = yield usuarioService.getUsuarioById(emprestimoAtualizado.usuarioId);
                if (!usuario)
                    throw new Error('Usuario do emprestimo nao encontrado.');
                usuarioService.atualizarSuspensao(usuario.cpf, 'Suspenso');
            }
            return emprestimoAtualizado;
        });
    }
}
exports.EmprestimoService = EmprestimoService;
