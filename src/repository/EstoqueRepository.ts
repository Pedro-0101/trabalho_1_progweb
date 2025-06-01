import { Estoque } from "../model/Estoque";

export class EstoqueRepository {
    private static instance: EstoqueRepository;
    private listaEstoques: Estoque[] = [];

    private constructor() {}

    public static getInstance(): EstoqueRepository {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }

    public getListaEstoques(): Estoque[] {
        return this.listaEstoques;
    }

    public addEstoqueNovo(estoque: Estoque): void {
        this.listaEstoques.push(estoque);
    }

    public addEstoqueExistente(livroId: number, quantidade: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidade += quantidade;
        }
    }

    public getQuantidadeLivro(livroId: number): number {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        return estoque ? estoque.quantidade : 0;
    }

    public atualizarDisponibilidade(livroId: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.disponivel = estoque.quantidade > estoque.quantidadeEmprestada;
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByLivroId(livroId: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.livroId === livroId);
    }
}