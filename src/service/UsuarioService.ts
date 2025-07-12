import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;
    
    constructor() {
        this.usuarioRepository = UsuarioRepository.getInstance();
    }

    async criarUsuario(nome: string, cpf: string, categoriaId: number, cursoId: number): Promise<Usuario> {

        // Instancia o novo usuario
        let usuario = new Usuario(nome, cpf, categoriaId, cursoId);

        // Adiciona o usuário ao repositório e retorna
        usuario = await this.usuarioRepository.insertUsuario(usuario);
        return usuario;
    }

    /*public listaUsuariosFiltro(categoriaId: number | null, cursoId: number | null): Usuario[]{

        const listaUsuarios = this.usuarioRepository.getListaUsuarios();

        if(categoriaId){
            listaUsuarios.filter( u => u.categoriaId === categoriaId);
        }

        if(cursoId){
            listaUsuarios.filter( u => u.cursoId === cursoId);
        }

        return listaUsuarios;

    }

    public getUsuarioByCpf(cpf: string): Usuario{

        const usuario = this.usuarioRepository.getUsuarioByCpf(cpf);
        if(usuario){
            return usuario;
        }else{
            throw new Error("Usuario nao encontrado");
        }

    }

    public atualizaUsuario(nome: string, cpf: string, categoriaId: number, cursoId: number): Usuario{

        nome = textUtils.capitalizarTexto(nome);

        // Valida o nome do usuário
        if (!nome || nome.trim() === "" || nome.length < 3) {
            throw new Error("O nome do usuário deve ter mais de 3 caracteres válidos.");
        }

        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

        cpf = cpf.trim();
        cpf = cpf.replace(/[^0-9]/g, ""); // Remove caracteres não numéricos

        // valida o CPF
        if(!this.validarCpf(cpf)) {
            throw new Error("CPF inválido.");
        }

        // Verifica se a categoria existe
        if (!this.categoriaUsuario.getListaCategoriasUsuarios().some(categoria => categoria.id === categoriaId)) {
            throw new Error("Categoria inválida.");
        }

        // Verifica se o curso existe
        if (!this.cursoRepository.getListaCursos().some(curso => curso.id === cursoId)) {
            throw new Error("Curso inválido.");
        }

        const usuarioAtualizado = this.usuarioRepository.atualizaUsuario(nome, cpf, categoriaId, cursoId);
        return usuarioAtualizado;

    }

    public removeUsuario(cpf: string){

        const emprestimoService = new EmprestimoService();
        const usuario = this.usuarioRepository.getUsuarioByCpf(cpf);

        if(!usuario){
            throw new Error("Erro ao remover usuario: Usuario nao encontrado");
        }

        const qtdeEmprestada = emprestimoService.emprestimosEmAbertoUsuario(usuario.id);

        if(qtdeEmprestada){
            throw new Error("Erro ao remover usuario: Existem emprestimos em andamento");
        }

        this.usuarioRepository.removeUsuario(cpf);

    }

    public alteraStatusUsuario(id: number, status: boolean): void{

        const usuario = this.usuarioRepository.getUsuarioById(id);

        if(!usuario){
            throw new Error("Usuario nao encontrado")
        }

        usuario.ativo = status;

    }*/


}