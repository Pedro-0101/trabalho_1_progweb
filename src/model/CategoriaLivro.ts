import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivro {
    id: number;
    nome: string;

    constructor(nome: string) {
        
        let instance = CategoriaLivroRepository.getInstance();      // Cria uma instância do repositório
        this.id = instance.getListaCategoriasLivros().length + 1;   // Atribui um ID único baseado no tamanho da lista de categorias
        this.nome = nome;                                           // Atribui o nome da categoria, validacao realizada no service
        
        instance.addCategoriaLivro(this);                           // Adiciona a categoria ao repositório
        
    }
}