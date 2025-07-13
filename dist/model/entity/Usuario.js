"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const textUtil_1 = require("../../utils/textUtil");
class Usuario {
    calcularDigitoVerificador(cpf, digito, peso) {
        let soma = 0;
        for (let i = 0; i < cpf.length; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        let resto = soma % 11;
        let digitoVerificador = resto < 2 ? 0 : 11 - resto;
        return digito === digitoVerificador.toString();
    }
    validarCpf(cpf) {
        if (!cpf || cpf.length !== 11) {
            return false;
        }
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }
        let primeiroDigito = this.calcularDigitoVerificador(cpf.slice(0, 9), cpf[9], 10);
        let segundoDigito = this.calcularDigitoVerificador(cpf.slice(0, 10), cpf[10], 11);
        return primeiroDigito && segundoDigito;
    }
    constructor(nome, cpf, ativo, categoriaId, cursoId, id) {
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do usuário não pode ser vazio.");
        }
        if (!cpf || cpf.trim() === "") {
            throw new Error("O CPF não pode ser vazio.");
        }
        if (!this.validarCpf(cpf)) {
            throw new Error("CPF inválido.");
        }
        nome = textUtil_1.textUtils.capitalizarTexto(nome);
        this.id = id !== null && id !== void 0 ? id : 0;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = ativo;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}
exports.Usuario = Usuario;
