export class Emprestimo {
    id: number;
    usuarioId: number;
    estoqueId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    dataEntrega: Date  | null;
    diasAtraso: number | null;
    suspensaoAte: Date | null;

    constructor(id: number, usuarioId: number, estoqueId: number, dataEmprestimo: Date, dataDevolucao: Date, dataEntrega: Date | null, diasAtraso: number, suspensaoAte: Date | null) {

        this.id = id;                        
        this.usuarioId = usuarioId;          
        this.estoqueId = estoqueId;          
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;  
        this.dataEntrega = dataEntrega;      
        this.diasAtraso = diasAtraso;        
        this.suspensaoAte = suspensaoAte;     

    };
}