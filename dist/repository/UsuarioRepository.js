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
exports.UsuarioRepository = void 0;
const Usuario_1 = require("../model/entity/Usuario");
const mysql_1 = require("../database/mysql");
class UsuarioRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(255) NOT NULL,
            ativo VARCHAR(255) NOT NULL,
            categoria_id INT NOT NULL,
            curso_id INT NOT NULL,
            UNIQUE (cpf),
            FOREIGN KEY (categoria_id) REFERENCES categorias_usuario(id),
            FOREIGN KEY (curso_id) REFERENCES cursos(id)
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela usuarios criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela usuarios', err);
            }
        });
    }
    insertUsuario(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO usuarios(nome, cpf, ativo, categoria_id, curso_id) VALUES (?, ?, ?, ?, ?)', [usuario.nome, usuario.cpf, usuario.ativo, usuario.categoriaId, usuario.cursoId]);
                console.log('Usuário inserido com sucesso!', resultado);
                return resultado.insertId;
            }
            catch (err) {
                console.error('Erro ao inserir usuário:', err);
                throw err;
            }
        });
    }
    getUsuarioByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM usuarios WHERE cpf = ?', [cpf]);
                if (!rows || rows.length === 0) {
                    return null;
                }
                const row = rows[0];
                return new Usuario_1.Usuario(row.nome, row.cpf, row.ativo, row.categoria_id, row.curso_id, row.id);
            }
            catch (err) {
                console.error('Erro ao buscar usuário por CPF:', err);
                throw err;
            }
        });
    }
    getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM usuarios', []);
                if (!rows || rows.length === 0) {
                    return null;
                }
                return rows;
            }
            catch (err) {
                console.error('Erro ao buscar usuários:', err);
                throw err;
            }
        });
    }
    atualizarUsuario(nome, cpf, ativo, categoriaId, cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('UPDATE usuarios SET nome = ?, cpf = ?, ativo = ?, categoria_id = ?, curso_id = ? WHERE cpf = ?', [nome, cpf, ativo, categoriaId, cursoId, cpf]);
                if (resultado.affectedRows === 0) {
                    return null;
                }
                return yield this.getUsuarioByCpf(cpf);
            }
            catch (err) {
                console.error('Erro ao atualizar usuário:', err);
                throw err;
            }
        });
    }
    deletarUsuario(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, mysql_1.executeQuery)('DELETE FROM usuarios WHERE cpf = ?', [cpf]);
                if (resultado.affectedRows === 0) {
                    return false;
                }
                return true;
            }
            catch (err) {
                console.error('Erro ao deletar usuário:', err);
                throw err;
            }
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
