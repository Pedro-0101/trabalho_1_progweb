"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
class Curso {
    constructor(nome) {
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
        // Valida o nome do curso
        if (!nome || nome.trim() === "" || nome.length < 3) {
            throw new Error("O nome do curso deve ter mais de 3 caracteres válidos.");
        }
        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
        // Verifica se o curso já existe
        let cursoExistente = this.cursoRepository.getListaCursos().find(curso => curso.nome === nome);
        if (cursoExistente) {
            throw new Error("Curso já existe.");
        }
        // Cria um novo curso com um ID único
        let id = this.cursoRepository.getListaCursos().length + 1;
        this.id = id;
        this.nome = nome;
    }
}
exports.Curso = Curso;
