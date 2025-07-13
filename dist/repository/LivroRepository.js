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
            const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO livros(titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)', [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoriaId]);
            console.log('Livro inserido com sucesso!', resultado);
            return resultado.insertId;
        });
    }
    getLivroByIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM livros WHERE isbn = ?', [isbn.trim()]);
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Livro_1.Livro(row.titulo, row.autor, row.editora, row.edicao, row.isbn, row.categoria_id, row.id);
        });
    }
    getLivroById(livroId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM livros WHERE id = ?', [livroId]);
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Livro_1.Livro(row.titulo, row.autor, row.editora, row.edicao, row.isbn, row.categoria_id, row.id);
        });
    }
    getLivroAEE(autor, editora, edicao) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM livros WHERE autor = ? AND editora = ? AND edicao = ?', [autor.trim(), editora.trim(), edicao.trim()]);
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Livro_1.Livro(row.titulo, row.autor, row.editora, row.edicao, row.isbn, row.categoria_id, row.id);
        });
    }
}
exports.LivroRepository = LivroRepository;
/*
    public getListaLivros(): Livro[] {
        return this.listaLivros;
    }

    public getLivroById(id: number): Livro {

        if (id < 0) {
            throw new Error("ID inválido");
        }
        if (id >= this.listaLivros.length) {
            throw new Error("Livro não encontrado");
        }
        if (this.listaLivros.length === 0) {
            throw new Error("Nenhum livro cadastrado");
        }
        const livro = this.listaLivros.find(l => l.id === id);
        if (!livro) {
            throw new Error(`Livro com ID ${id} não encontrado`);
        }
        return livro;
        
    }
    public atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Livro {
        const livro = this.getLivroByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro nao encontrado");
        }

        livro.titulo = titulo;
        livro.autor = autor;
        livro.editora = editora;
        livro.edicao = edicao;
        livro.categoriaId = categoriaId;

        return livro;
    }

    public deletarLivro(isbn: string): boolean {
        const index = this.listaLivros.findIndex(l => l.isbn === isbn);
        if (index === -1) {
            return false;
        }
        this.listaLivros.splice(index, 1);
        return true;
    }

}*/ 
