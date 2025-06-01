export class Curso {
    id: number;
    nome: string;

    constructor(id: number, nome: string) {

        this.id = id;       // Espera recever id valido (service)
        this.nome = nome;   // Espera receber uma string não vazia maior que 3 caracteres (service)

    }
}