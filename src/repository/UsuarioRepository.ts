import { Usuario } from "../model/Usuario";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private listaUsuarios: Usuario[] = [];

    private constructor() {}

    public static getInstance(): UsuarioRepository {
        if (!UsuarioRepository.instance) {
            UsuarioRepository.instance = new UsuarioRepository();
        }
        return UsuarioRepository.instance;
    }

    public getListaUsuarios(): Usuario[] {
        return this.listaUsuarios;
    }

    public addUsuario(usuario: Usuario): void {
        this.listaUsuarios.push(usuario);
    }
}