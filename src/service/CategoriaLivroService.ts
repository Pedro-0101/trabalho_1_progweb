import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor() {
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    }

    public criarCategoriaLivro(nome: string): CategoriaLivro {
        
        
        let categoriaLivro = new CategoriaLivro(nome);

        // Verifica se a categoria foi criada corretamente
        if (!categoriaLivro) {
            throw new Error("Erro ao criar a categoria.");
        }

        // Adiciona a categoria ao repositório
        this.CategoriaLivroRepository.addCategoriaLivro(categoriaLivro);

        // Retorna a categoria criada
        return categoriaLivro;

    }

    public listarCategorias(): CategoriaLivro[] {
        // Retorna todas as categorias
        return this.CategoriaLivroRepository.getListaCategoriasLivros();
    }

}