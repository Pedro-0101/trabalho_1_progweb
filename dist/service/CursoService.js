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
const Curso_1 = require("../model/entity/Curso");
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    constructor() {
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    }
    criarCurso(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cria instância temporária apenas para validar e padronizar o nome
            const cursoTemp = new Curso_1.Curso(nome);
            // Persiste e obtém o ID gerado
            const id = yield this.cursoRepository.insertCurso(cursoTemp);
            // Retorna nova instância com o ID preenchido
            return new Curso_1.Curso(nome, id);
        });
    }
    getCursoById(cursoId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cursoId)
                throw new Error('Curso invalido.');
            return yield this.cursoRepository.getCursoById(cursoId);
        });
    }
    getCursos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.cursoRepository.getCursos();
        });
    }
}
exports.CursoService = CursoService;
