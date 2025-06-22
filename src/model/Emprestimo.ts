import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { UsuarioService } from "../service/UsuarioService"
import { DateUtils } from "../utils/dateUtils";

export class Emprestimo {
    id: number;
    usuarioId: number;
    estoqueId: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;
    dataEntrega: Date  | null;
    diasAtraso: number | null;
    suspensaoAte: Date | null;

    private emprestimoRepository: EmprestimoRepository;
    private estoqueRepository: EstoqueRepository;
    private usuarioRepository: UsuarioRepository;
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor(usuarioId: number, estoqueId: number, dataEmprestimo: Date, dataDevolucao: Date, dataEntrega: Date | null, diasAtraso: number, suspensaoAte: Date | null) {
        
        this.emprestimoRepository = EmprestimoRepository.getInstance();
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.usuarioRepository = UsuarioRepository.getInstance();
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();

        // Valida a data de empréstimo
        if (!(dataEmprestimo instanceof Date)) {
            throw new Error("Data de empréstimo inválida.");
        }

        let id = this.emprestimoRepository.getListaEmprestimos().length + 1;

        this.id = id;                        
        this.usuarioId = usuarioId;          
        this.estoqueId = estoqueId;          
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;  
        this.dataEntrega = dataEntrega;      
        this.diasAtraso = diasAtraso;        
        this.suspensaoAte = suspensaoAte;     

    }
}