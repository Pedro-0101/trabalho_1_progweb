import { CategoriaLivro } from "../model/CategoriaLivro";

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;
    private listaCategoriasLivros: CategoriaLivro[] = [];

    private constructor() {}

    public static getInstance(): CategoriaLivroRepository {
        if (!CategoriaLivroRepository.instance) {
            CategoriaLivroRepository.instance = new CategoriaLivroRepository();
        }
        return CategoriaLivroRepository.instance;
    }

    public getListaCategoriasLivros(): CategoriaLivro[] {
        return this.listaCategoriasLivros;
    }

    public addCategoriaLivro(categoria: CategoriaLivro): void {
        this.listaCategoriasLivros.push(categoria);
    }

    public getCategoriaLivroById(id: number): CategoriaLivro | undefined {
        return this.listaCategoriasLivros.find(categoria => categoria.id === id);
    }
}