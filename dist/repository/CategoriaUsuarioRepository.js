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
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/entity/CategoriaUsuario");
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS categorias_usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela categorias_usuario criada com sucesso: ', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela categorias_usuario', err);
            }
        });
    }
    insertCategoriaUsuario(categoriaUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO categorias_usuario(nome) VALUES (?)', [categoriaUsuario.nome]);
                console.log('Categoria de usuário inserida com sucesso!', resultado);
                return resultado.insertId;
            }
            catch (err) {
                console.error('Erro ao inserir categoria de usuário', err);
                throw err;
            }
        });
    }
    getCategoriaUsuarioById(categoriaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM categorias_usuario WHERE id = ?', [categoriaId]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new CategoriaUsuario_1.CategoriaUsuario(row.nome, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar categoria de usuário por ID', err);
                throw err;
            }
        });
    }
    getCategoriasUsuario() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM categorias_usuario', []);
                if (!rows || rows.length === 0) {
                    return null;
                }
                return rows;
            }
            catch (err) {
                console.error('Erro ao buscar categorias de usuário', err);
                throw err;
            }
        });
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
