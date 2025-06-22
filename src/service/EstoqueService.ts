import { Estoque } from "../model/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository: EstoqueRepository;
    private livroRepository: LivroRepository;

    constructor() {
        this.estoqueRepository = EstoqueRepository.getInstance();
        this.livroRepository = LivroRepository.getInstance();
    }

    public registrarEstoque(isbn: string, quantidade: number): Estoque {
        
        let estoque = new Estoque(isbn, 1, true);

        // Verifica se o estoque foi criado corretamente
        if (!estoque) {
            throw new Error("Erro ao criar o estoque.");
        }

        // Adiciona o estoque ao repositório
        this.estoqueRepository.addEstoqueNovo(estoque);

        // Retorna o estoque criado
        return estoque;

    }

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

}