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
}