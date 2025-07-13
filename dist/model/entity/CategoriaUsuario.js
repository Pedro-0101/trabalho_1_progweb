"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuario = void 0;
const textUtil_1 = require("../../utils/textUtil");
class CategoriaUsuario {
    constructor(nome, id) {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome da categoria não pode ser vazio.");
        }
        nome = textUtil_1.textUtils.capitalizarTexto(nome);
        this.id = id !== null && id !== void 0 ? id : 0;
        this.nome = nome;
    }
}
exports.CategoriaUsuario = CategoriaUsuario;
