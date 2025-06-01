import { CategoriaUsuario } from "../model/CategoriaUsuario";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;
    private listaCategoriasUsuarios: CategoriaUsuario[] = [];

    private constructor() {}

    public static getInstance(): CategoriaUsuarioRepository {
        if (!CategoriaUsuarioRepository.instance) {
            CategoriaUsuarioRepository.instance = new CategoriaUsuarioRepository();
        }
        return CategoriaUsuarioRepository.instance;
    }
    
    public getListaCategoriasUsuarios(): CategoriaUsuario[] {
        return this.listaCategoriasUsuarios;
    }
    
    public addCategoriaUsuario(categoria: CategoriaUsuario): void {
        this.listaCategoriasUsuarios.push(categoria);
    }
}