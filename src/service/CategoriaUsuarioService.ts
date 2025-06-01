import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    private categoriaUsuarioRepository: CategoriaUsuarioRepository;

    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    }

    public criarCategoriaUsuario(nome: string): CategoriaUsuario {
        // Valida o nome da categoria
        if (!nome || nome.trim() === "" || nome.length < 3) {
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
        let categoriaUsuario = new CategoriaUsuario(id, nome);

        // Verifica se a categoria foi criada corretamente
        if (!categoriaUsuario) {
            throw new Error("Erro ao criar a categoria.");
        }

        // Adiciona a categoria ao repositório
        this.categoriaUsuarioRepository.addCategoriaUsuario(categoriaUsuario);

        // Retorna a categoria criada
        return categoriaUsuario;
    }

    public listarCategoriasUsuarios(): CategoriaUsuario[] {
        // Retorna a lista de categorias de usuário
        return this.categoriaUsuarioRepository.getListaCategoriasUsuarios();
    }

}