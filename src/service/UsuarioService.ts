import { Usuario } from "../model/entity/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { CursoService } from "./CursoService";
import { EmprestimoService } from "./EmprestimoService";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;
    private categiriaUsuarioService: CategoriaUsuarioService;
    private cursoService: CursoService;
    private emprestimoService: EmprestimoService;
    
    constructor() {
        this.usuarioRepository = UsuarioRepository.getInstance();
        this.categiriaUsuarioService = new CategoriaUsuarioService();
        this.cursoService = new CursoService();
        this.emprestimoService = new EmprestimoService();
    }

    private async validaDadosUsuario(nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number): Promise<Usuario>{

        cpf = cpf.replace(/[^\d]/g, "");

        // Verificar se existe a categoria
        const categoriaUsuario = await this.categiriaUsuarioService.getCategoriaUsuarioById(categoriaId);
        if(!categoriaUsuario)throw new Error('Categoria de usuario invalida');
    
        // Verifica se existe o curso
        const curso = await this.cursoService.getCursoById(cursoId);
        if(!curso)throw new Error('Curso invalido.');
    
        // Cria instância temporária apenas para validar e padronizar dados
        const usuarioTemp = new Usuario(nome, cpf, ativo, categoriaId, cursoId);

        return usuarioTemp;

    }

    async criarUsuario(nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number): Promise<Usuario> {
        
        const usuarioValidado = await this.validaDadosUsuario(nome, cpf, ativo, categoriaId, cursoId);

        // Verifica se existe o cpf
        const usuarioRepetido = await this.getUsuarioByCpf(usuarioValidado.cpf);
        if(usuarioRepetido)throw new Error('Cpf invalido, cpf ja cadastrado.');

        // Persiste e obtém o ID gerado
        const id = await this.usuarioRepository.insertUsuario(usuarioValidado);

        // Retorna nova instância imutável com o ID preenchido
        return new Usuario(nome, cpf, ativo, categoriaId, cursoId, id);
    }

    async getUsuarioByCpf(cpf: string): Promise<Usuario | null> {

        cpf = cpf.replace(/[^\d]/g, "");
        if(!cpf)throw new Error('CPF invalido.');
        return this.usuarioRepository.getUsuarioByCpf(cpf);
    }

    async getUsuarios(categoriaId?: number, cursoId?: number): Promise< Usuario[] | null> {

        return await this.usuarioRepository.getUsuarios(categoriaId, cursoId);

    }

    async atualizarUsuario(nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number): Promise<Usuario | null>{

        cpf = cpf.replace(/[^\d]/g, "");

        const usuario = await this.getUsuarioByCpf(cpf);
        if(!usuario)throw new Error('CPF invalido.');

        const usuarioAtualizado = await this.validaDadosUsuario(nome, cpf, ativo, categoriaId, cursoId);

        return await this.usuarioRepository.atualizarUsuario(usuarioAtualizado.nome, usuarioAtualizado.cpf, usuarioAtualizado.ativo, usuarioAtualizado.categoriaId, usuarioAtualizado.cursoId);

    }

    async deletarUsuario(cpf: string): Promise<Boolean> {

        // Verificar se exite usuario com o cpf
        cpf = cpf.replace(/[^\d]/g, "");
        if(!cpf)throw new Error('CPF invalido.');
        const usuario = await this.getUsuarioByCpf(cpf);
        if(!usuario)throw new Error('CPF invalido.');

        // Verificar se usuario nao tem emprestimo aberto
        const emprestimosAbertos = await this.emprestimoService.getListaEmprestimos(true, 0, usuario.id);
        if(emprestimosAbertos){
            console.error('Usuario possui emprestimos em aberto.');
            return false;
        }
        return await this.usuarioRepository.deletarUsuario(cpf);
    }
}