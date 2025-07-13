import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";
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

    async getCategoriaUsuarioById(categoriaId: number): Promise<CategoriaUsuario | null>{

        if(!categoriaId)throw new Error('Categoria invalida.');
        return await this.categoriaUsuarioRepository.getCategoriaUsuarioById(categoriaId);

    }

    /*public listarCategoriasUsuarios(): CategoriaUsuario[] {
        // Retorna a lista de categorias de usuário
        return this.categoriaUsuarioRepository.getListaCategoriasUsuarios();
    }*/

}