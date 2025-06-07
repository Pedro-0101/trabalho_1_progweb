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

    public atualizarDisponibilidade(livroId: number): Estoque | null {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.disponivel = estoque.quantidade > estoque.quantidadeEmprestada;
            return estoque;
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByLivroId(livroId: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.livroId === livroId);
    }

    public getEstoqueById(id: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.id === id);
    }

    public atualizarQuantidadeEmprestada(livroId: number, quantidade: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidadeEmprestada += quantidade;
            this.atualizarDisponibilidade(livroId);
        } else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByCodigo(codigo: number): Estoque | null {
        const estoque = this.listaEstoques.find(e => e.id === codigo);
        return estoque || null;
    }

    public deletarEstoque(codigo: number): void {
        const estoque = this.getEstoqueById(codigo);
        if (!estoque) {
            throw new Error(`Estoque com código ${codigo} não encontrado.`);
        }
        if(estoque.quantidadeEmprestada > 0) {
            throw new Error(`Não é possível remover o estoque com código ${codigo} porque ele está emprestado.`);
        }
        // Remove o estoque da lista
        this.listaEstoques = this.listaEstoques.filter(e => e.id !== codigo);
    }
}