import { Emprestimo } from "../model/entity/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueService } from "./EstoqueService";
import { LivroService } from "./LivroService";
import { UsuarioService } from "./UsuarioService";

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private estoqueService: EstoqueService;
    private usuarioService: UsuarioService;
    private livroService: LivroService;

    constructor() {
        this.emprestimoRepository = EmprestimoRepository.getInstance();
        this.estoqueService = new EstoqueService();
        this.usuarioService = new UsuarioService();
        this.livroService = new LivroService();
    }

    public async registrarEmprestimo(cpf: string, codigoExemplar: number): Promise<Emprestimo> {

        const dataEmprestimo = new Date();

        // Busca usuário e valida
        const usuario = await this.usuarioService.getUsuarioByCpf(cpf);
        if (!usuario) throw new Error("Usuário não encontrado.");
        if (usuario.ativo == "Inativo") throw new Error("Usuário inativo.");
        if (usuario.ativo == "Suspenso") throw new Error("Usuário suspenso.");

        // Busca estoque e valida ***Rever essa validacao***
        const estoque = await this.estoqueService.getEstoqueByLivroId(codigoExemplar);
        if (!estoque) throw new Error("Estoque não encontrado.");
        if (!estoque.disponivel) throw new Error("Estoque indisponível.");

        // Busca categoria usuário e categoria livro
        const categoriaUsuario = usuario.categoriaId;
        const livro = await this.livroService.getLivroById(estoque.livroId);
        if (!livro) throw new Error("Livro não encontrado para este estoque.");
        
        // Calcula data devolução
        const categoriaLivro = livro.categoriaId;
        let dataDevolucao = new Date(dataEmprestimo);
        if (categoriaUsuario === 1) { // professor
            dataDevolucao.setDate(dataEmprestimo.getDate() + 40);
        } else if (usuario.cursoId === categoriaLivro) {
            dataDevolucao.setDate(dataEmprestimo.getDate() + 30);
        } else {
            dataDevolucao.setDate(dataEmprestimo.getDate() + 15);
        }

        // Verifica limite de empréstimos abertos
        const emprestimosEmAberto = await this.emprestimoRepository.emprestimosEmAberto(usuario.id);
        if (categoriaUsuario === 1 && emprestimosEmAberto >= 5) {
            throw new Error("Limite de empréstimos em aberto atingido para professores.");
        }
        if (categoriaUsuario === 2 && emprestimosEmAberto >= 3) {
            throw new Error("Limite de empréstimos em aberto atingido para alunos.");
        }

        // Cria empréstimo (id fica 0 antes de inserir)
        const emprestimoTemp = new Emprestimo(
            usuario.id,
            estoque.id,
            dataEmprestimo,
            dataDevolucao,
            null,
            null,
            null,
            0
        );

        // Persiste empréstimo e pega id gerado
        const id = await this.emprestimoRepository.insertEmprestimo(emprestimoTemp);

        // Atualiza quantidade emprestada no estoque
        await this.estoqueService.atualizarQuantidadeEmprestada(estoque.livroId, 1);

        // Retorna instância final com id preenchido
        return new Emprestimo(
            usuario.id,
            estoque.id,
            dataEmprestimo,
            dataDevolucao,
            null,
            null,
            null,
            id
        );
    }

    async getListaEmprestimos(ativo: boolean, estoqueId?: number, usuarioId?: number): Promise<Emprestimo[] | null> {

        if(ativo){
            return await this.emprestimoRepository.getListaEmprestimosEmAberto(estoqueId, usuarioId);
        }else{
            return await this.emprestimoRepository.getListaEmprestimosFechados(estoqueId, usuarioId);
        }

    }

}