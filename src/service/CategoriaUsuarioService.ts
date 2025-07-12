import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    private categoriaUsuarioRepository: CategoriaUsuarioRepository;

    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    }

    async criarCategoriaUsuario(nome: string): Promise<CategoriaUsuario>{
        
        // Instancia nova categoria de usuario
        let categoriaUsuario = new CategoriaUsuario(nome);

        // Adiciona a categoria ao repositório e retorna
        categoriaUsuario = await this.categoriaUsuarioRepository.insertCategoriaUsuario(categoriaUsuario);
        return categoriaUsuario;

    }

    /*public listarCategoriasUsuarios(): CategoriaUsuario[] {
        // Retorna a lista de categorias de usuário
        return this.categoriaUsuarioRepository.getListaCategoriasUsuarios();
    }*/

}