export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: string;
    categoriaId: number;
    cursoId: number;

/*
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
*/
    constructor(id: number, nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number) {

        this.id = id;                  
        this.nome = nome;              
        this.cpf = cpf;                
        this.ativo = ativo;             
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;        

    }
}