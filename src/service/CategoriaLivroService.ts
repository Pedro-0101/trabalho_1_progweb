import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivroService {
    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor() {
        this.CategoriaLivroRepository = CategoriaLivroRepository.getInstance();
    }

    public criarCategoriaLivro(nome: string): CategoriaLivro {
        
        // Valida o nome da categoria
        if (!nome || nome.trim() === "" || nome.length < 3) {
            throw new Error("O nome da categoria deve ter mais de 3 caracteres validos.");
        }

        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase(); // Capitaliza a primeira letra e deixa o resto em minúsculas

        // Verifica se a categoria já existe
        let categoriaExistente =  this.CategoriaLivroRepository.getListaCategoriasLivros().find(categoria => categoria.nome === nome);
        if (categoriaExistente) {
            throw new Error("Categoria já existe.");
        }

        // Cria uma nova categoria com um ID único
        // Atribui um ID único baseado no tamanho atual da lista de categorias
        let id = this.CategoriaLivroRepository.getListaCategoriasLivros().length + 1;
        let categoriaLivro = new CategoriaLivro(id, nome);

        // Verifica se a categoria foi criada corretamente
        if (!categoriaLivro) {
            throw new Error("Erro ao criar a categoria.");
        }

        // Adiciona a categoria ao repositório
        this.CategoriaLivroRepository.addCategoriaLivro(categoriaLivro);

        // Retorna a categoria criada
        return categoriaLivro;

    }
}