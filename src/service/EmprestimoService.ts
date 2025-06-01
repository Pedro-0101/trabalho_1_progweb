import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private estoqueRepository: EstoqueRepository;
    private usuarioRepository: UsuarioRepository;
    private livroRepository: LivroRepository;
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor() {
        this.emprestimoRepository = EmprestimoRepository.getInstance();
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.usuarioRepository = UsuarioRepository.getInstance();
        this.livroRepository = LivroRepository.getInstance();
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    }

    public criarEmprestimo(usuarioId: number, estoqueId: number, dataEmprestimo: Date): Emprestimo {

        // Verifica se o usuário existe
        const usuario = this.usuarioRepository.getListaUsuarios().find(u => u.id === usuarioId);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        // Verifica se o estoque existe
        const estoque = this.estoqueRepository.getListaEstoques().find(e => e.id === estoqueId);
        if (!estoque) {
            throw new Error("Estoque não encontrado.");
        }

        // Verifica se o estoque está disponível
        if (!estoque.disponivel) {
            throw new Error("Estoque indisponível.");
        }
        
                // Valida a data de empréstimo
                if (!(dataEmprestimo instanceof Date)) {
                    throw new Error("Data de empréstimo inválida.");
                }
        
        // Define variáveis para data de devolução, curso do usuário, categoria do usuário e categoria do livro
        let dataDevolucao = new Date(dataEmprestimo);
        let cursoUsuario = this.usuarioRepository.getUsuarioById(usuarioId)?.nome;
        let categoriaUsuario = this.usuarioRepository.getUsuarioById(usuarioId)?.categoriaId;
        let livroId = this.estoqueRepository.getEstoqueByLivroId(estoqueId)?.livroId;
        let categoriaLivro: string | undefined = undefined;
        if (livroId !== undefined) {
            categoriaLivro = this.CategoriaLivroRepository.getCategoriaLivroById(livroId)?.nome;
        }

        // Calcula data de devolucao
        if ( categoriaUsuario === 1) {                                  // Categoria professor, emprestimo de 40 dias
            dataDevolucao.setDate(dataEmprestimo.getDate() + 40);
        }
        if ( cursoUsuario === categoriaLivro ){
            dataDevolucao.setDate(dataEmprestimo.getDate() + 30);       // Se o curso do usuário for o mesmo do livro, emprestimo de 30 dias
        }
        else{                                                           
            dataDevolucao.setDate(dataEmprestimo.getDate() + 15);       // Categoria aluno, livro de outro curso, emprestimo de 15 dias
        }

        // Verfica numero de empréstimos do usuário em andamento
        let emprestimosEmAberto = this.emprestimoRepository.emprestimosEmAberto(usuarioId);
        if ( categoriaUsuario === 1 && emprestimosEmAberto >= 5) { // Categoria professor, máximo de 5 empréstimos em aberto
            throw new Error("Limite de empréstimos em aberto atingido para usuários da categoria professor.");
        }

        if ( categoriaUsuario === 2 && emprestimosEmAberto >= 3) { // Categoria aluno, máximo de 3 empréstimos em aberto
            throw new Error("Limite de empréstimos em aberto atingido para usuários da categoria aluno.");
        }
        
        /*      Passou em todas validacoes      */

        // Cria o empréstimo
        let id = this.emprestimoRepository.getListaEmprestimos().length + 1;
        let emprestimo = new Emprestimo(id, usuarioId, estoqueId, dataEmprestimo, dataDevolucao, null, 0, null);

        // Adiciona o empréstimo ao repositório
        this.emprestimoRepository.addEmprestimo(emprestimo);

        return emprestimo;
    }
}