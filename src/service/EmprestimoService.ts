import { Emprestimo } from "../model/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { UsuarioService } from "./UsuarioService";
import { DateUtils } from "../utils/dateUtils";

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private estoqueRepository: EstoqueRepository;
    private usuarioRepository: UsuarioRepository;
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor() {
        this.emprestimoRepository = EmprestimoRepository.getInstance();
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.usuarioRepository = UsuarioRepository.getInstance();
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    }

    public registrarEmprestimo(cpf: string, codigoExemplar: number, dataEmprestimo: Date): Emprestimo {

        // Verifica se o usuário existe
        const usuario = this.usuarioRepository.getListaUsuarios().find(u => u.cpf === cpf);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        // Verifica se o usuário está ativo
        if (!usuario.ativo) {
            throw new Error("Usuário inativo.");
        }

        // Verifica se o estoque existe
        const estoque = this.estoqueRepository.getListaEstoques().find(e => e.id === codigoExemplar);
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
        let cursoUsuario = this.usuarioRepository.getUsuarioById(usuario.id)?.nome;
        let categoriaUsuario = this.usuarioRepository.getUsuarioById(usuario.id)?.categoriaId;
        let livroId = this.estoqueRepository.getEstoqueByLivroId(usuario.id)?.livroId;
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
        let emprestimosEmAberto = this.emprestimoRepository.emprestimosEmAberto(usuario.id);
        if ( categoriaUsuario === 1 && emprestimosEmAberto >= 5) { // Categoria professor, máximo de 5 empréstimos em aberto
            throw new Error("Limite de empréstimos em aberto atingido para usuários da categoria professor.");
        }

        if ( categoriaUsuario === 2 && emprestimosEmAberto >= 3) { // Categoria aluno, máximo de 3 empréstimos em aberto
            throw new Error("Limite de empréstimos em aberto atingido para usuários da categoria aluno.");
        }
        
        /*      Passou em todas validacoes      */

        // Cria o empréstimo
        let id = this.emprestimoRepository.getListaEmprestimos().length + 1;
        let emprestimo = new Emprestimo(id, usuario.id, estoque.id, dataEmprestimo, dataDevolucao, null, 0, null);

        // Adiciona o empréstimo ao repositório
        this.emprestimoRepository.addEmprestimo(emprestimo);
        // Atualiza a quantidade emprestada no estoque
        this.estoqueRepository.atualizarQuantidadeEmprestada(estoque.livroId, 1);

        return emprestimo;
    }

    public listarEmprestimos(): Emprestimo[] {
        return this.emprestimoRepository.getListaEmprestimos();
    }

    public registrarDevolucao(id: number): Emprestimo {
        // Busca o empréstimo pelo ID
        const emprestimo = this.emprestimoRepository.getEmprestimoById(id);
        if (!emprestimo) {
            throw new Error("Empréstimo não encontrado.");
        }

        // Verifica se o empréstimo já foi devolvido
        if (emprestimo.dataDevolucao) {
            throw new Error("Empréstimo já foi devolvido.");
        }

        // Registra a devolução
        emprestimo.dataDevolucao = new Date();
        emprestimo.diasAtraso = DateUtils.diferencaDias(new Date(), emprestimo.dataEntrega);

        // Calcula suspensao se atrasado
        if(emprestimo.diasAtraso > 0){
            emprestimo.suspensaoAte = DateUtils.somaData(new Date(), emprestimo.diasAtraso);
        }
        
        // Atualiza o status do estoque para disponível
        const estoque = this.estoqueRepository.getEstoqueById(emprestimo.estoqueId);
        if (!estoque) {
            throw new Error("Estoque não encontrado.");
        }

        this.estoqueRepository.atualizarQuantidadeEmprestada(estoque.livroId, -1);
        this.verificarEmprestimos();

        return emprestimo;
    }

    public qtdeEmprestada(estoqueId: number): number{

        return this.emprestimoRepository.qtdeEmprestada(estoqueId);

    }

    public emprestimosEmAbertoUsuario(usuarioId: number): number{

        const empAbertos = this.emprestimoRepository.emprestimosEmAberto(usuarioId);

        return empAbertos;

    }

    public verificarEmprestimos(): void{

        const emprestimosEmAberto = this.listarEmprestimos();
        emprestimosEmAberto.filter( e => !e.dataEntrega);
        emprestimosEmAberto.filter( e => e.dataDevolucao > new Date());

        emprestimosEmAberto.forEach( e => {
            console.log(`Emprestimo em atraso ${e.id}, usuario ${e.usuarioId}`);
            let us = new UsuarioService();
            us.alteraStatusUsuario(e.usuarioId, false);
        })

    }


}