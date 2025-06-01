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
exports.CursoService = void 0;
const Curso_1 = require("../model/Curso");
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    constructor() {
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    }
    criarCurso(nome, descricao) {
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
        let curso = new Curso_1.Curso(id, nome);
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
        return __awaiter(this, void 0, void 0, function* () {
            // Retorna a lista de cursos
            return this.cursoRepository.getListaCursos();
        });
    }
}
exports.CursoService = CursoService;
