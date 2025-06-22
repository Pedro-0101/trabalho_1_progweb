import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class Estoque {
    id: number;
    livroId: number;
    quantidade: number;
    quantidadeEmprestada: number;
    disponivel: boolean;

    private estoqueRepository: EstoqueRepository;
    private livroRepository: LivroRepository;

    constructor(isbn: string, quantidade: number, disponivel: boolean) {

        this.estoqueRepository = EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository.getInstance();

        // Verifica se o livro existe
        const livro = this.livroRepository.getLivroByIsbn(isbn);
        const livroId = livro.id;
        if (!livro) {
            throw new Error("Livro não existe.");
        }

        // Verifica se a quantidade é válida
        if (quantidade < 0) {
            throw new Error("Quantidade inválida. Deve ser maior ou igual a 0.");
        }

        // Verifica se já existe um estoque para o livro
        const estoqueExistente = this.estoqueRepository.getEstoqueByLivroId(livroId);
        if (estoqueExistente) {
            this.estoqueRepository.addEstoqueExistente(estoqueExistente.id, quantidade);
        }

        // Cria um novo estoque
        let id = this.estoqueRepository.getListaEstoques().length + 1;

        this.id = id;                                         
        this.livroId = livroId;                             
        this.quantidade = quantidade;                       
        this.quantidadeEmprestada = 0;   
        this.disponivel = disponivel;                       

    }
}