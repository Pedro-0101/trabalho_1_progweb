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
exports.EstoqueRepository = void 0;
const Estoque_1 = require("../model/entity/Estoque");
const mysql_1 = require("../database/mysql");
class EstoqueRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS estoques (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livro_id INT NOT NULL,
            quantidade INT NOT NULL,
            quantidade_emprestada INT NOT NULL,
            disponivel BOOLEAN NOT NULL,
            FOREIGN KEY (livro_id) REFERENCES livros(id)
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela estoques criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela estoques', err);
            }
        });
    }
    insertEstoque(estoque) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO estoques(livro_id, quantidade, quantidade_emprestada, disponivel) VALUES (?, ?, ?, ?)', [estoque.livroId, estoque.quantidade, estoque.quantidadeEmprestada, estoque.disponivel]);
            console.log('Estoque inserido com sucesso!', resultado);
            return resultado.insertId;
        });
    }
    getEstoqueByLivroId(livro_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM estoques WHERE livro_id = ?', [livro_id]);
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Estoque_1.Estoque(row.id, row.livro_id, row.quantidade, row.quantidade_emprestada, row.disponivel);
        });
    }
    atualizarQuantidadeEmprestada(estoqueId, qtde_atualizada) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield (0, mysql_1.executeQuery)('UPDATE estoques SET quantidade_emprestada = ? WHERE id = ?', [qtde_atualizada, estoqueId]);
            console.log('Quantidade emprestada atualizada com sucesso', resultado);
            return true;
        });
    }
    getEstoqueDisponivel(disponivel, livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conditions = [];
            const params = [];
            conditions.push("disponivel = ?");
            params.push(disponivel);
            if (livroId) {
                conditions.push("livro_id = ?");
                params.push(livroId);
            }
            let query = 'SELECT * FROM estoques';
            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
            const rows = yield (0, mysql_1.executeQuery)(query, params);
            if (!rows || rows.length === 0) {
                return null;
            }
            return rows.map((row) => new Estoque_1.Estoque(row.livro_id, row.quantidade, row.disponivel, row.quantidade_emprestada, row.id));
        });
    }
}
exports.EstoqueRepository = EstoqueRepository;
/*
    public getListaEstoques(): Estoque[] {
        return this.listaEstoques;
    }

    public addEstoqueExistente(livroId: number, quantidade: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidade += quantidade;
        }
    }

    public getQuantidadeLivro(livroId: number): number {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        return estoque ? estoque.quantidade : 0;
    }

    public atualizarDisponibilidade(livroId: number): Estoque | null {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.disponivel = estoque.quantidade > estoque.quantidadeEmprestada;
            return estoque;
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByLivroId(livroId: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.livroId === livroId);
    }

    public getEstoqueById(id: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.id === id);
    }

    public atualizarQuantidadeEmprestada(livroId: number, quantidade: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidadeEmprestada += quantidade;
            this.atualizarDisponibilidade(livroId);
        } else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByCodigo(codigo: number): Estoque | null {
        const estoque = this.listaEstoques.find(e => e.id === codigo);
        return estoque || null;
    }

    public deletarEstoque(codigo: number): void {
        const estoque = this.getEstoqueById(codigo);
        if (!estoque) {
            throw new Error(`Estoque com código ${codigo} não encontrado.`);
        }
        if(estoque.quantidadeEmprestada > 0) {
            throw new Error(`Não é possível remover o estoque com código ${codigo} porque ele está emprestado.`);
        }
        // Remove o estoque da lista
        this.listaEstoques = this.listaEstoques.filter(e => e.id !== codigo);
    }*/
