import e from "express";
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

        const exemplar = await this.getEstoqueByLivroId(livro_id);
        if(!exemplar)throw new Error('Exemplar invalido.');

        const qtde_atualizada = exemplar.quantidadeEmprestada + quantidade;

        const att =  await this.estoqueRepository.atualizarQuantidadeEmprestada(exemplar.id, qtde_atualizada);
        await this.atualizarDisponibilidade(exemplar.id);
        return att;

    }

    async getListaEstoque(disponivel: boolean, livroId?: number): Promise<Estoque[] | null> {

        return await this.estoqueRepository.getListaEstoque(disponivel, livroId);

    }

    async getEstoqueById(id: number): Promise<Estoque | null> {

        if(!id)throw new Error('Id de estoque invalido.');

        return await this.estoqueRepository.getEstoqueById(id);

    }

    async atualizarDisponibilidade(id: number): Promise<Estoque | null> {

        if(!id)throw new Error('Id do estoque invalido');
        
        return await this.estoqueRepository.atualizarDisponibilidade(id);

    }

    async getDisponibilidadeEstoque(id: number): Promise<boolean> {

        if(!id)throw new Error('Id de estoque invalido');

        return await this.estoqueRepository.getDisponibilidadeEstoque(id);

    }

    async deletarEstoque(id: number): Promise<boolean> {

        if(!id)throw new Error('Id de estoque invalido');
        const exemplar = await this.estoqueRepository.getEstoqueById(id);
        if(!exemplar)throw new Error('Exemplar nao encontrado.');

        if(exemplar.quantidadeEmprestada != 0){
            throw new Error('Exemplar esta com emprestimo em aberto.');
        }
        return await this.estoqueRepository.deletarEstoque(id);

    }
}