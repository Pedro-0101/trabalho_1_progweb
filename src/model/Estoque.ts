export class Estoque {
    id: number;
    livroId: number;
    quantidade: number;
    quantidadeEmprestada: number;
    disponivel: boolean;

    constructor(
        livroId: number,
        quantidade: number,
        disponivel: boolean,
        quantidadeEmprestada?: number,
        id?: number
    ) {
        if (quantidade < 0) {
            throw new Error("Quantidade inválida. Deve ser maior ou igual a 0.");
        }

        this.id = id ?? 0;
        this.livroId = livroId;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = quantidadeEmprestada ?? 0;
        this.disponivel = disponivel;
    }
}
