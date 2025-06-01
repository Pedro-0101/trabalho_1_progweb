"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
class CursoRepository {
    constructor() {
        this.listaCursos = [];
    }
    static getInstance() {
        if (!CursoRepository.instance) {
            CursoRepository.instance = new CursoRepository();
        }
        return CursoRepository.instance;
    }
    getListaCursos() {
        return this.listaCursos;
    }
    addCurso(curso) {
        this.listaCursos.push(curso);
    }
    getCursoById(id) {
        return this.listaCursos.find(curso => curso.id === id);
    }
}
exports.CursoRepository = CursoRepository;
