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
            const query = `CREATE TABLE IF NOT EXISTS categoriasLivro (
				id INT AUTO_INCREMENT PRIMARY KEY,
				nome VARCHAR(255) NOT NULL
		)`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela categoriasLivro criada com sucesso: ', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela categoriasLivro', err);
            }
        });
    }
    insertCategoriaLivro(categoriaLivro) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO categoriasLivro(nome) VALUES (?)', [categoriaLivro.nome]);
            console.log('Categoria de livro inserida com sucesso!', resultado);
            return resultado.insertId;
        });
    }
    getCategoriaLivroById(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM categoiriasLivro WHERE id = ?', [categoriaId]);
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new CategoriaLivro_1.CategoriaLivro(row.nome, row.id);
        });
    }
    getCategoriasLivro() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM categoiriasLivro', []);
            if (!rows || rows.length === 0) {
                return null;
            }
            return rows;
        });
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
/*
public getListaCategoriasLivros(): CategoriaLivro[] {
        return this.listaCategoriasLivros;
}

public addCategoriaLivro(categoria: CategoriaLivro): void {
        this.listaCategoriasLivros.push(categoria);
}

public getCategoriaLivroById(id: number): CategoriaLivro | undefined {
        return this.listaCategoriasLivros.find(categoria => categoria.id === id);
}
}
*/ 
