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

    public getUsuarioById(id: number): Usuario | undefined {
        return this.listaUsuarios.find(usuario => usuario.id === id);
    }

    public getUsuarioByCpf(cpf: string): Usuario{

        if(!cpf){
            throw new Error("CPF invalido");
        }

        const usuario = this.getListaUsuarios().find( u => u.cpf === cpf);

        if(usuario){
            return usuario;
        }else{
            throw new Error("Usuario nao encontrado");
        }

    }

    public atualizaUsuario(nome: string, cpf: string, categoriaId: number, cursoId: number): Usuario{

        const usuario = this.getUsuarioByCpf(cpf);

        if(!usuario){
            throw new Error("Erro ao atualizar usuario");
        }

        usuario.nome = nome;
        usuario.cpf = cpf;
        usuario.categoriaId = categoriaId;
        usuario.cursoId = cursoId;

        return usuario;
    }

    public removeUsuario(cpf: string): void{

        const usuario = this.getUsuarioByCpf(cpf);

        if(!usuario){
            throw new Error("Erro ao remover usuario: Usuario nao encontrado");
        }

        const index = this.listaUsuarios.findIndex( u => u.cpf === cpf);
        this.listaUsuarios.splice(index, 1);

    }
}