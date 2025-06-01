export class Estoque {
    id: number;
    livroId: number;
    quantidade: number;
    quantidadeEmprestada: number;
    disponivel: boolean;
    

    constructor(id: number, livroId: number, quantidade: number, quantidadeEmprestada: number, disponivel: boolean) {

        this.id = id;                                       // Espera receber um número inteiro maior que 0 (service)
        this.livroId = livroId;                             // Espera receber um ID de livro válido (service)
        this.quantidade = quantidade;                       // Espera receber um número inteiro maior ou igual a 0 (service)
        this.quantidadeEmprestada = quantidadeEmprestada;   // Espera receber um número inteiro maior ou igual a 0 (service)
        this.disponivel = disponivel;                       // Espera receber um booleano (service)

    }
}