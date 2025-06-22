import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    private categoriaUsuarioRepository: CategoriaUsuarioRepository;

    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    }

    public criarCategoriaUsuario(nome: string): CategoriaUsuario {
        
        let categoriaUsuario = new CategoriaUsuario(nome);

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