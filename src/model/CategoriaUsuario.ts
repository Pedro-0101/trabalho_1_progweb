import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuario {
    id: number;
    nome: string;

    private categoriaUsuarioRepository: CategoriaUsuarioRepository;

    constructor(nome: string) {

        this.categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();

        // Valida o nome da categoria
        if (!nome || nome.trim() === "" || nome.length <= 3) {
            throw new Error("O nome da categoria deve ter mais de 3 caracteres válidos.");
        }

        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

        // Verifica se a categoria já existe
        let categoriaExistente = this.categoriaUsuarioRepository.getListaCategoriasUsuarios().find(categoria => categoria.nome === nome);
        if (categoriaExistente) {
            throw new Error("Categoria já existe.");
        }

        // Cria uma nova categoria com um ID único
        let id = this.categoriaUsuarioRepository.getListaCategoriasUsuarios().length + 1;

        this.id = id;
        this.nome = nome;
        
    }
}