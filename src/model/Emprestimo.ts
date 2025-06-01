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
        
        this.id = id;                                           // Espera receber um ID único para o empréstimo (service) 
        this.usuarioId = usuarioId;                             // Verificar se o usuário existe no sistema (service)
        this.estoqueId = estoqueId;                             // Verificar se o estoque existe no sistema (service)
        this.dataEmprestimo = dataEmprestimo;                   // Espera receber uma data válida de empréstimo (service)
        this.dataDevolucao = dataDevolucao;                     // Espera receber data posterior a data de empréstimo (service)
        this.dataEntrega = dataEntrega;                         // Inicialmente, deve ser nulo (service)
        this.diasAtraso = diasAtraso;                           // Inicialmente, deve ser 0 (service)
        this.suspensaoAte = suspensaoAte;                       // Inicialmente, deve ser nulo (service)

    }
}