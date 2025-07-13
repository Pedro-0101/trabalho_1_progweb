import { textUtils } from "../../utils/textUtil";

export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: string;
    categoriaId: number;
    cursoId: number;

    private calcularDigitoVerificador(cpf: string, digito: string, peso: number): boolean {
        let soma = 0;
        for (let i = 0; i < cpf.length; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        let resto = soma % 11;
        let digitoVerificador = resto < 2 ? 0 : 11 - resto;

        return digito === digitoVerificador.toString();
    }

    private validarCpf(cpf: string): boolean {

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

    constructor(nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number, id?: number) {

        cpf = cpf.replace(/[^\d]/g, "");

        if (!nome || nome.trim() === "") {
            throw new Error("O nome do usuário não pode ser vazio.");
        }

        if (!this.validarCpf(cpf)) {
            throw new Error("CPF inválido.");
        }

        nome = textUtils.capitalizarTexto(nome);
        ativo = textUtils.capitalizarTexto(ativo);

        this.id = id ?? 0;
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = ativo;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}
