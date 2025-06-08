import { Livro } from '../model/Livro';

export class LivroRepository {
    private static instance: LivroRepository;
    private listaLivros: Livro[] = [];

    private constructor() {}

    public static getInstance(): LivroRepository {
        if (!LivroRepository.instance) {
            LivroRepository.instance = new LivroRepository();
        }
        return LivroRepository.instance;
    }

    public getListaLivros(): Livro[] {
        return this.listaLivros;
    }

    public addLivro(livro: Livro): void {
        this.listaLivros.push(livro);
    }

    public getLivroById(id: number): Livro {

        if (id < 0) {
            throw new Error("ID inválido");
        }
        if (id >= this.listaLivros.length) {
            throw new Error("Livro não encontrado");
        }
        if (this.listaLivros.length === 0) {
            throw new Error("Nenhum livro cadastrado");
        }
        const livro = this.listaLivros.find(l => l.id === id);
        if (!livro) {
            throw new Error(`Livro com ID ${id} não encontrado`);
        }
        return livro;
        
    }

    public getLivroByIsbn(isbn: string): Livro {
        const livro = this.listaLivros.find(l => l.isbn === isbn);
        if (!livro) {
            throw new Error(`Livro com ISBN ${isbn} não encontrado`);
        }
        return livro;
    }

    public atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Livro {
        const livro = this.getLivroByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro nao encontrado");
        }

        livro.titulo = titulo;
        livro.autor = autor;
        livro.editora = editora;
        livro.edicao = edicao;
        livro.categoriaId = categoriaId;

        return livro;
    }

    public deletarLivro(isbn: string): boolean {
        const index = this.listaLivros.findIndex(l => l.isbn === isbn);
        if (index === -1) {
            return false;
        }
        this.listaLivros.splice(index, 1);
        return true;
    }

}