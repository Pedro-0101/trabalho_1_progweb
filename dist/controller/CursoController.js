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
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
class CursoController {
    constructor() {
        this.cursoService = new CursoService_1.CursoService();
    }
    listarCursos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield this.cursoService.listarCursos();
                res.status(200).json(cursos);
            }
            catch (error) {
                res.status(500).json({ message: "Erro ao listar cursos", error });
            }
        });
    }
}
exports.CursoController = CursoController;
