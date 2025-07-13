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
            try {
                const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO estoques(livro_id, quantidade, quantidade_emprestada, disponivel) VALUES (?, ?, ?, ?)', [estoque.livroId, estoque.quantidade, estoque.quantidadeEmprestada, estoque.disponivel]);
                console.log('Estoque inserido com sucesso!', resultado);
                return resultado.insertId;
            }
            catch (err) {
                console.error('Erro ao inserir estoque', err);
                return 0;
            }
        });
    }
    getEstoqueByLivroId(livro_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM estoques WHERE livro_id = ?', [livro_id]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new Estoque_1.Estoque(row.livro_id, row.quantidade, row.disponivel, row.quantidade_emprestada, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar estoque por livro_id', err);
                return null;
            }
        });
    }
    atualizarQuantidadeEmprestada(estoqueId, qtde_atualizada) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('UPDATE estoques SET quantidade_emprestada = ? WHERE id = ?', [qtde_atualizada, estoqueId]);
                console.log('Quantidade emprestada atualizada com sucesso', resultado);
                return true;
            }
            catch (err) {
                console.error('Erro ao atualizar quantidade emprestada', err);
                return false;
            }
        });
    }
    getListaEstoque(disponivel, livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                return rows;
            }
            catch (err) {
                console.error('Erro ao buscar lista de estoques', err);
                return null;
            }
        });
    }
    getEstoqueById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM estoques WHERE id = ?', [id]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new Estoque_1.Estoque(row.livro_id, row.quantidade, row.disponivel, row.quantidade_emprestada, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar estoque por id', err);
                return null;
            }
        });
    }
    atualizarDisponibilidade(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)(`UPDATE estoques SET disponivel = 
                CASE WHEN quantidade > quantidade_emprestada THEN 
                    1 
                    ELSE 
                    0 
                END 
                WHERE id = ?`, [id]);
                if (resultado.affectedRows != 0) {
                    return this.getEstoqueById(id);
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.error('Erro ao atualizar disponibilidade do estoque', err);
                return null;
            }
        });
    }
    getDisponibilidadeEstoque(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('SELECT disponivel FROM estoques WHERE id = ?', [id]);
                return resultado;
            }
            catch (err) {
                console.error('Erro ao buscar estoque por id', err);
                return false;
            }
        });
    }
    deletarEstoque(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('DELETE FROM estoques WHERE id = ?', [id]);
                if (resultado.affectedRows == 0) {
                    throw new Error('Erro ao deletar estoque');
                }
                return true;
            }
            catch (err) {
                console.error('Erro ao deletar estoque', err);
                return false;
            }
        });
    }
}
exports.EstoqueRepository = EstoqueRepository;
