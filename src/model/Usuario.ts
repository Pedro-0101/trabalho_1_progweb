import { textUtils } from "../utils/textUtil";

export class Usuario {
    id: number | null;
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
        
        // Verifica se o CPF tem 11 dígitos
        if (!cpf || cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex: 11111111111)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let primeiroDigito = this.calcularDigitoVerificador(cpf.slice(0, 9), cpf[9], 10);

        // Calcula o segundo dígito verificador
        let segundoDigito = this.calcularDigitoVerificador(cpf.slice(0, 10), cpf[10], 11);

        // Retorna verdadeiro se ambos os dígitos verificadores estiverem corretos
        if (!primeiroDigito || !segundoDigito) {
            return false;
        }

        return true;

    }

    constructor(nome: string, cpf: string, categoriaId: number, cursoId: number) {

        if (!nome || nome.trim() === "") {
            throw new Error("O nome do usuário não pode ser vazio.");
        }

        if (!cpf || cpf.trim() === "") {
            throw new Error("O CPF não pode ser vazio.");
        }

        if (!this.validarCpf(cpf)) {
            throw new Error("CPF inválido.");
        }

        if (typeof categoriaId !== "number" || isNaN(categoriaId) || categoriaId <= 0) {
            throw new Error("CategoriaId inválido.");
        }

        if (typeof cursoId !== "number" || isNaN(cursoId) || cursoId <= 0) {
            throw new Error("CursoId inválido.");
        }

        nome = textUtils.capitalizarTexto(nome);

        this.id = null;                  
        this.nome = nome;              
        this.cpf = cpf;                
        this.ativo = 'Ativo';             
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;        

    }
}