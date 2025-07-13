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
exports.CursoRepository = void 0;
const Curso_1 = require("../model/entity/Curso");
const mysql_1 = require("../database/mysql");
class CursoRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `CREATE TABLE IF NOT EXISTS cursos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela cursos criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela cursos', err);
            }
        });
    }
    insertCurso(curso) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield (0, mysql_1.executeQuery)('INSERT INTO cursos(nome) VALUES (?)', [curso.nome]);
            console.log('Curso inserido com sucesso!', resultado);
            return resultado.insertId;
        });
    }
    getCursoById(cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM cursos WHERE id = ?', [cursoId]);
            if (!rows || rows.length === 0) {
                return null;
            }
            const row = rows[0];
            return new Curso_1.Curso(row.nome, row.id);
        });
    }
    getCursos() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield (0, mysql_1.executeQuery)('SELECT * FROM cursos', []);
            if (!rows || rows.length === 0) {
                return null;
            }
            return rows;
        });
    }
}
exports.CursoRepository = CursoRepository;
/*
public getListaCursos(): Curso[] {
    return this.listaCursos;
}

public addCurso(curso: Curso): void {
    this.listaCursos.push(curso);
}

public getCursoById(id: number): Curso | undefined {
    return this.listaCursos.find(curso => curso.id === id);
}*/ 
