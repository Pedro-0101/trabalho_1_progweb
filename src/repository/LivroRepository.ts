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
}