import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor() {
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    }

    public async criarCategoriaLivro(nome: string): Promise<CategoriaLivro> {
        
        let categoriaLivro = new CategoriaLivro(nome);

        // Adiciona a categoria ao repositório e retorna ao controller
        categoriaLivro = await this.CategoriaLivroRepository.insertCategoriaLivro(categoriaLivro);
        return categoriaLivro;
    }

   /* public listarCategorias(): CategoriaLivro[] {
        // Retorna todas as categorias
        return this.CategoriaLivroRepository.getListaCategoriasLivros();
    }*/

}