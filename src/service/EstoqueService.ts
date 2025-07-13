import { Estoque } from "../model/entity/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroService } from "./LivroService";

export class EstoqueService {
    private estoqueRepository: EstoqueRepository;
    private livroService: LivroService;

    constructor() {
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.livroService = new LivroService();
    }

    async registrarEstoque(livroId: number, quantidade: number): Promise<Estoque> {
        // Busca o livro pelo id
        const livro = await this.livroService.getLivroById(livroId);
        if(!livro)throw new Error('Livro invalido.');

        // Cria instância temporária apenas para validação
        const estoqueTemp = new Estoque(livro.id, quantidade, true);

        // Persiste e obtém o ID gerado
        const id = await this.estoqueRepository.insertEstoque(estoqueTemp);

        // Retorna nova instância com ID preenchido
        return new Estoque(livro.id, quantidade, true, 0, id);
    }

    async getEstoqueByLivroId(livro_id: number): Promise<Estoque | null> {

        if(!livro_id)throw new Error('Id do livro invalido.');
        return this.estoqueRepository.getEstoqueByLivroId(livro_id);

    }

    async atualizarQuantidadeEmprestada(livro_id: number, quantidade: number): Promise<boolean> {

        if(!livro_id)throw new Error('Id do livro invalido.');
        if(!quantidade)throw new Error('Quantidade invalida.');

        const exemplar = await this.getEstoqueByLivroId(livro_id);
        if(!exemplar)throw new Error('Exemplar invalido.');

        const qtde_atualizada = exemplar?.quantidadeEmprestada + quantidade;

        return await this.estoqueRepository.atualizarQuantidadeEmprestada(exemplar.id, qtde_atualizada);

    }

    async getEstoqueDisponivel(disponivel: boolean, livroId?: number): Promise<Estoque[] | null> {

        return await this.estoqueRepository.getEstoqueDisponivel(disponivel, livroId);

    }
}