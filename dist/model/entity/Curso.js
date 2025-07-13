"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curso = void 0;
const textUtil_1 = require("../../utils/textUtil");
class Curso {
    constructor(nome, id) {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do curso não pode ser vazio.");
        }
        nome = textUtil_1.textUtils.capitalizarTexto(nome);
        this.id = id !== null && id !== void 0 ? id : 0;
        this.nome = nome;
    }
}
exports.Curso = Curso;
