export class Emprestimo {
    id: number;
    usuarioId: number;
    estoqueId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    dataEntrega: Date | null;
    diasAtraso: number | null;
    suspensaoAte: Date | null;

    constructor(
        usuarioId: number,
        estoqueId: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        dataEntrega: Date | null = null,
        diasAtraso: number | null = null,
        suspensaoAte: Date | null = null,
        id?: number
    ) {
        if (!(dataEmprestimo instanceof Date))
            throw new Error("dataEmprestimo inválida.");
        if (!(dataDevolucao instanceof Date))
            throw new Error("dataDevolucao inválida.");

        this.id = id ?? 0;
        this.usuarioId = usuarioId;
        this.estoqueId = estoqueId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.dataEntrega = dataEntrega;
        this.diasAtraso = diasAtraso;
        this.suspensaoAte = suspensaoAte;
    }
}
