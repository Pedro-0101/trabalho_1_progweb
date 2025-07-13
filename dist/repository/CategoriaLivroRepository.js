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
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/entity/CategoriaLivro");
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS categorias_livro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela categorias_livro criada com sucesso: ', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela categorias_livro', err);
            }
        });
    }
    insertCategoriaLivro(categoriaLivro) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO categorias_livro(nome) VALUES (?)', [categoriaLivro.nome]);
                console.log('Categoria de livro inserida com sucesso!', resultado);
                return resultado.insertId;
            }
            catch (err) {
                console.error('Erro ao inserir categoria de livro', err);
                return -1;
            }
        });
    }
    getCategoriaLivroById(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM categorias_livro WHERE id = ?', [categoriaId]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new CategoriaLivro_1.CategoriaLivro(row.nome, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar categoria de livro por ID', err);
                return null;
            }
        });
    }
    getCategoriasLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM categorias_livro', []);
                if (!rows || rows.length === 0) {
                    return null;
                }
                return rows;
            }
            catch (err) {
                console.error('Erro ao buscar categorias de livro', err);
                return null;
            }
        });
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
