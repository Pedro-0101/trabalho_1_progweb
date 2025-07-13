import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroService } from "./LivroService";

export class EstoqueService {
    private estoqueRepository: EstoqueRepository;
    private livroService: LivroService;

    constructor() {
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.livroService = new LivroService();
    }

    async registrarEstoque(isbn: string, quantidade: number): Promise<Estoque> {
        // Busca o livro pelo ISBN
        const livro = await this.livroService.getLivroByIsbn(isbn);
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
        return await this.estoqueRepository.atualizarQuantidadeEmprestada(livro_id, quantidade);

    }
/*
    public getListaEstoques(): Estoque[] {
        return this.estoqueRepository.getListaEstoques();
    }

    public getByCodigo(codigo: number): Estoque | null {
        return this.estoqueRepository.getEstoqueByCodigo(codigo);
    }

    public atualizaDisponibilidade(codigo: number): Estoque | null {
        const estoque = this.estoqueRepository.getEstoqueByCodigo(codigo);
        if (!estoque) {
            throw new Error("Exemplar não encontrado.");
        }
        this.estoqueRepository.atualizarDisponibilidade(estoque.livroId);
        return estoque;
    }

    public deletarEstoque(codigo: number): void {
        const estoque = this.estoqueRepository.getEstoqueByCodigo(codigo);
        if (!estoque) {
            throw new Error("Exemplar não encontrado.");
        }
        this.estoqueRepository.deletarEstoque(codigo);
    }

    public getEstoqueId(livroId: number | null, isbn: string | null): number{

        if(livroId){
            let estoque = this.estoqueRepository.getEstoqueByLivroId(livroId);
            if (estoque) {
                return estoque.id;
            } else {
                throw new Error("Estoque nao encontrado");
            }
        }

        if(isbn){
            let livro = this.livroRepository.getLivroByIsbn(isbn);
            let estoque = this.estoqueRepository.getEstoqueByLivroId(livro.id);

            if(estoque){
                return estoque.id;
            }else{
                throw new Error("Estoque nao encontrado")
            }
        }

        throw new Error("Estoque nao encontrado")

    }
*/
}