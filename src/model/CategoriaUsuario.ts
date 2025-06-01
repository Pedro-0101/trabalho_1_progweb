import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuario {
    id: number;
    nome: string;

    constructor(nome: string) {

        let instance = CategoriaUsuarioRepository.getInstance();    // Cria uma instância do repositório
        this.id = instance.getListaCategoriasUsuarios().length + 1; // Atribui um ID único baseado no tamanho da lista de categorias
        this.nome = nome;                                           // Atribui o nome da categoria, validacao realizada no service
        
        instance.addCategoriaUsuario(this);                         // Adiciona a categoria ao repositório
        
    }
}