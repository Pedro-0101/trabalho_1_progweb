import { DateUtils } from "../utils/dateUtils";
import { Emprestimo } from "../model/entity/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueService } from "./EstoqueService";
import { LivroService } from "./LivroService";
import { UsuarioService } from "./UsuarioService";

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;

    constructor() {
        this.emprestimoRepository = EmprestimoRepository.getInstance();
    }

    public async registrarEmprestimo(cpf: string, codigoExemplar: number): Promise<Emprestimo> {

        const usuarioService = new UsuarioService();
        const estoqueService = new EstoqueService();
        const livroService = new LivroService();

        const dataEmprestimo = new Date();

        // Busca usuário e valida
        const usuario = await usuarioService.getUsuarioByCpf(cpf);
        if (!usuario) throw new Error("Usuário não encontrado.");
        if (usuario.ativo == "Inativo") throw new Error("Usuário inativo.");
        if (usuario.ativo == "Suspenso") throw new Error("Usuário suspenso.");

        // Busca estoque e valida
        const estoque = await estoqueService.getEstoqueByLivroId(codigoExemplar);
        if (!estoque) throw new Error("Estoque não encontrado.");
        if (!estoque.disponivel) throw new Error("Estoque indisponível.");

        // Busca categoria usuário e categoria livro
        const categoriaUsuario = usuario.categoriaId;
        const livro = await livroService.getLivroById(estoque.livroId);
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
        await estoqueService.atualizarQuantidadeEmprestada(estoque.livroId, 1);

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

    async getEmprestimoById(id: number): Promise<Emprestimo | null> {

        if(!id)throw new Error('Id de emprestimo invalido.');

        return await this.emprestimoRepository.getEmprestimoById(id);


    }

    public static calcularSuspensao(dataDevolucao: Date, dataEntrega: Date){

        if(!dataDevolucao || !dataEntrega) throw new Error('Data de devolucao ou data de entrega invalida.');

        const diasAtraso = DateUtils.diferencaDias(dataEntrega, dataDevolucao);
        if (dataEntrega <= dataDevolucao) {
            return 0;
        }
        return diasAtraso;
    }

    async registrarDevolucao(id: number): Promise<Emprestimo | null> {

        const usuarioService = new UsuarioService();
        const estoqueService = new EstoqueService();

        if(!id)throw new Error('Id de emprestimo invalido.');

        const emprestimo = await this.getEmprestimoById(id);
        if(!emprestimo)throw new Error('Emprestimo nao encontrado.');

        // Define data de devolucao
        const dataEntregaString = DateUtils.formatarData(new Date(), 'aaaa-mm-dd');
        const dataEntregaDate = DateUtils.parseDataFromString(dataEntregaString);

        // Calcula atraso
        const diasAtraso = EmprestimoService.calcularSuspensao(emprestimo.dataDevolucao, dataEntregaDate);
        const diasSuspensao = diasAtraso * 3;
        var suspensao_ate: Date | null = null

        if(diasSuspensao != 0){
            suspensao_ate = DateUtils.somaData(dataEntregaDate, diasSuspensao);
        }

        // Atualiza emprestimo
        const emprestimoAtualizado = await this.emprestimoRepository.registraDevolucao(id, dataEntregaString, diasAtraso, suspensao_ate);

        if(!emprestimoAtualizado){
            console.error(`Nao foi possivela registrar a devolucao do emprestimo ${id}.`);
            return null;
        }

        // Altera disponibilidade do exemplar
        const exemplar = await estoqueService.getEstoqueById(emprestimo.estoqueId);
        if(!exemplar)throw new Error('Nao foi possivel encontrar exemplar do emprestimo');

        estoqueService.atualizarQuantidadeEmprestada(exemplar.livroId, -1);

        // Altera status do usuario caso tenha atraso
        if(diasSuspensao != 0){
            const usuario = await usuarioService.getUsuarioById(emprestimoAtualizado.usuarioId);
            if(!usuario)throw new Error('Usuario do emprestimo nao encontrado.');
            usuarioService.atualizarSuspensao(usuario.cpf, 'Suspenso')
        }

        return emprestimoAtualizado;
    }

}