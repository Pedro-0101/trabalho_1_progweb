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

    public async registrarEmprestimo(cpf: string, codigoExemplar: number, dataEmprestimo: Date): Promise<Emprestimo> {
        // Busca usuário e valida
        const usuario = await this.usuarioService.getUsuarioByCpf(cpf);
        if (!usuario) throw new Error("Usuário não encontrado.");
        if (usuario.ativo == "Inativo") throw new Error("Usuário inativo.");
        if (usuario.ativo == "Suspenso") throw new Error("Usuário suspenso.");

        // Busca estoque e valida
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
/*
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

        // Listar emprestimos em atraso
        const emprestimosEmAberto = this.listarEmprestimos();
        emprestimosEmAberto.filter( e => !e.dataEntrega);
        emprestimosEmAberto.filter( e => e.dataDevolucao < new Date());

        emprestimosEmAberto.forEach( e => {
            console.log(`Emprestimo em atraso ${e.id}, usuario ${e.usuarioId}`);
            let us = new UsuarioService();
            us.alteraStatusUsuario(e.usuarioId, false);
        })

        // Verificar se usuarios que ja devolveram nao estao mais suspensos
        const emprestimosFechados = this.listarEmprestimos();
        emprestimosFechados.filter(e => e.dataEntrega !== null && e.dataEntrega > e.dataDevolucao);

        emprestimosFechados.forEach(e => {
            if(e.suspensaoAte !== null && e.suspensaoAte > new Date()){
                
                let us = new UsuarioService()
                us.alteraStatusUsuario(e.usuarioId, true)
                
            }
        })
    }*/
}