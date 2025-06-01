import { EmprestimoRepository } from '../repository/EmprestimoRepository';

export class Emprestimo {
    id: number;
    usuarioId: number;
    estoqueId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    dataEntrega: Date  | null;
    diasAtraso: number | null;
    suspensaoAte: Date | null;

    constructor(usuarioId: number, estoqueId: number, dataEmprestimo: Date, dataDevolucao: Date) {
        
        let instance = EmprestimoRepository.getInstance();      // Cria uma instância do repositório
        this.id = instance.getListaEmprestimos().length + 1;    // Atribui um ID único baseado no tamanho da lista de empréstimos
        this.usuarioId = usuarioId;                             // Verificar se o usuário existe no sistema (service)
        this.estoqueId = estoqueId;                             // Verificar se o estoque existe no sistema (service)
        this.dataEmprestimo = dataEmprestimo;                   // Espera receber uma data válida de empréstimo (service)
        this.dataDevolucao = dataDevolucao;                     // Espera receber data posterior a data de empréstimo (service)
        this.dataEntrega = null;                                // Data de entrega será preenchida quando o livro for devolvido
        this.diasAtraso = 0;                                    // Inicialmente, não há atraso
        this.suspensaoAte = null;                               // Inicialmente, não há suspensão

        instance.addEmprestimo(this);                           // Adiciona o empréstimo à lista de empréstimos

    }
}