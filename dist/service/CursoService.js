"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const Curso_1 = require("../model/Curso");
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    constructor() {
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    }
    criarCurso(nome) {
        let curso = new Curso_1.Curso(nome);
        // Verifica se o curso foi criado corretamente
        if (!curso) {
            throw new Error("Erro ao criar o curso.");
        }
        // Adiciona o curso ao repositório
        this.cursoRepository.addCurso(curso);
        // Retorna o curso criado
        return curso;
    }
    listarCursos() {
        // Retorna a lista de cursos
        return this.cursoRepository.getListaCursos();
    }
}
exports.CursoService = CursoService;
