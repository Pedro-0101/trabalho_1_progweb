import { Usuario } from "../model/entity/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { CursoService } from "./CursoService";
import { EmprestimoService } from "./EmprestimoService";
import { DateUtils } from "../utils/dateUtils";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;
    
    constructor() {
        this.usuarioRepository = UsuarioRepository.getInstance();
    }

    private async validaDadosUsuario(nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number): Promise<Usuario>{

        const categiriaUsuarioService = new CategoriaUsuarioService();
        const cursoService = new CursoService()
        cpf = cpf.replace(/[^\d]/g, "");

        // Verificar se existe a categoria
        const categoriaUsuario = await categiriaUsuarioService.getCategoriaUsuarioById(categoriaId);
        if(!categoriaUsuario)throw new Error('Categoria de usuario invalida');
    
        // Verifica se existe o curso
        const curso = await cursoService.getCursoById(cursoId);
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

    async getUsuarioById(usuarioId: number): Promise<Usuario | null> {

        if(!usuarioId)throw new Error('Id do usuario invalido.');

        return this.usuarioRepository.getUsuarioById(usuarioId);
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

        const emprestimoService = new EmprestimoService();

        // Verificar se exite usuario com o cpf
        cpf = cpf.replace(/[^\d]/g, "");
        if(!cpf)throw new Error('CPF invalido.');
        const usuario = await this.getUsuarioByCpf(cpf);
        if(!usuario)throw new Error('CPF invalido.');

        // Verificar se usuario nao tem emprestimo aberto
        const emprestimosAbertos = await emprestimoService.getListaEmprestimos(true, 0, usuario.id);
        if(emprestimosAbertos){
            console.error('Usuario possui emprestimos em aberto.');
            return false;
        }
        return await this.usuarioRepository.deletarUsuario(cpf);
    }

    async atualizarSuspensao(cpf: string, ativo: string): Promise<boolean>{

        if(!cpf)throw new Error('Cpf do usuario invalido.');
        if(!ativo)throw new Error('Status de usuario invalido.');

        return await this.usuarioRepository.atualizarSuspensao(cpf, ativo);

    }

    async verificarEAtualizarStatusUsuarios(): Promise<void> {
        const emprestimoService = new EmprestimoService();
        const usuarios = await this.usuarioRepository.getUsuarios();
        const hoje = new Date();

        for (const usuario of usuarios || []) {
            let novoStatus: string | null = null;

            // Buscar todos os empréstimos abertos do usuário
            const emprestimos = await emprestimoService.getListaEmprestimos(true, usuario.id);

            if (!emprestimos || emprestimos.length === 0) {
                // Sem empréstimos abertos, mantém ativo
                continue;
            }

            // Pega o maior suspensao_ate dos empréstimos
            const maiorSuspensaoAte = emprestimos
                .map(emp => emp.suspensaoAte)
                .filter((dt): dt is Date => dt !== null && dt !== undefined)
                .reduce((max, dt) => (dt > max ? dt : max), new Date(0));

            // Se maior suspensão já passou, usuário fica ativo
            if (maiorSuspensaoAte && maiorSuspensaoAte < hoje) {
                novoStatus = "Ativo";
            } else {
                // Contar empréstimos com mais de 20 dias de atraso
                const atrasosMais20Dias = emprestimos.filter(emp => {
                    const diasAtraso = DateUtils.diferencaDias(hoje, emp.dataDevolucao);
                    return diasAtraso > 20;
                }).length;

                if (atrasosMais20Dias >= 1) {
                    novoStatus = "Suspenso";
                }

                if (emprestimos.length >= 2) {
                    novoStatus = "Inativo";
                }
            }

            // Atualiza status só se for diferente do atual
            if (novoStatus && usuario.ativo !== novoStatus) {
                console.log(`Atualizando status do usuário ${usuario.cpf} de ${usuario.ativo} para ${novoStatus}`);
                await this.usuarioRepository.atualizarSuspensao(usuario.cpf, novoStatus);
            }
        }
    }
}