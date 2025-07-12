import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService {
    private categoriaUsuarioRepository: CategoriaUsuarioRepository;

    constructor() {
        this.categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
    }

    async criarCategoriaUsuario(nome: string): Promise<CategoriaUsuario> {
        // Instância temporária só para validar e preparar o nome
        const categoriaTemp = new CategoriaUsuario(nome);

        // Persiste e obtém o ID gerado
        const id = await this.categoriaUsuarioRepository.insertCategoriaUsuario(categoriaTemp);

        // Retorna uma nova instância com o ID preenchido
        return new CategoriaUsuario(nome, id);
    }

    /*public listarCategoriasUsuarios(): CategoriaUsuario[] {
        // Retorna a lista de categorias de usuário
        return this.categoriaUsuarioRepository.getListaCategoriasUsuarios();
    }*/

}