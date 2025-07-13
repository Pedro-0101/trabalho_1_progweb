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
exports.LivroRepository = void 0;
const Livro_1 = require("../model/entity/Livro");
const mysql_1 = require("../database/mysql");
class LivroRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS livros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            editora VARCHAR(255) NOT NULL,
            edicao VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            categoria_id INT NOT NULL,
            UNIQUE (isbn),
            CONSTRAINT u_livro UNIQUE(autor, editora, edicao),
            FOREIGN KEY (categoria_id) REFERENCES categorias_livro(id)
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela livros criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela livros', err);
            }
        });
    }
    insertLivro(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO livros(titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)', [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoriaId]);
                console.log('Livro inserido com sucesso!', resultado);
                return resultado.insertId;
            }
            catch (err) {
                console.error('Erro ao inserir livro:', err);
                throw err;
            }
        });
    }
    getLivroByIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM livros WHERE isbn = ?', [isbn]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new Livro_1.Livro(row.titulo, row.autor, row.editora, row.edicao, row.isbn, row.categoria_id, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar livro por ISBN:', err);
                throw err;
            }
        });
    }
    getLivroById(livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM livros WHERE id = ?', [livroId]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new Livro_1.Livro(row.titulo, row.autor, row.editora, row.edicao, row.isbn, row.categoria_id, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar livro por ID:', err);
                throw err;
            }
        });
    }
    getLivroAEE(autor, editora, edicao) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM livros WHERE autor = ? AND editora = ? AND edicao = ?', [autor, editora, edicao]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new Livro_1.Livro(row.titulo, row.autor, row.editora, row.edicao, row.isbn, row.categoria_id, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar livro por autor, editora e edição:', err);
                throw err;
            }
        });
    }
    getLivros(autor, editora, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conditions = [];
                const params = [];
                if (autor) {
                    conditions.push("autor = ?");
                    params.push(autor);
                }
                if (editora) {
                    conditions.push("editora = ?");
                    params.push(editora);
                }
                if (categoriaId) {
                    conditions.push("categoria_id = ?");
                    params.push(categoriaId);
                }
                let query = "SELECT * FROM livros";
                if (conditions.length > 0) {
                    query += " WHERE " + conditions.join(" AND ");
                }
                const rows = yield (0, mysql_1.executeQuery)(query, params);
                if (!rows || rows.length === 0) {
                    return null;
                }
                return rows;
            }
            catch (err) {
                console.error('Erro ao buscar livros:', err);
                throw err;
            }
        });
    }
    atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('UPDATE livros SET titulo = ?, autor = ?, editora = ?, edicao = ?, isbn = ?, categoria_id = ? WHERE isbn = ?', [titulo, autor, editora, edicao, isbn, categoriaId, isbn]);
                if (resultado.affectedRows === 0) {
                    return null;
                }
                return yield this.getLivroByIsbn(isbn);
            }
            catch (err) {
                console.error('Erro ao atualizar livro:', err);
                throw err;
            }
        });
    }
    deletarLivro(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('DELETE FROM livros WHERE isbn = ?', [isbn]);
                if (resultado.affectedRows === 0) {
                    return false;
                }
                return true;
            }
            catch (err) {
                console.error('Erro ao deletar livro:', err);
                throw err;
            }
        });
    }
}
exports.LivroRepository = LivroRepository;
