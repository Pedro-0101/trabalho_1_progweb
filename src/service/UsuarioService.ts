import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { EmprestimoService } from "./EmprestimoService";
import { textUtils } from "../utils/textUtil";

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;
    private categoriaUsuario: CategoriaUsuarioRepository;
    private cursoRepository: CursoRepository;
    
    constructor() {
        this.usuarioRepository = UsuarioRepository.getInstance();
        this.categoriaUsuario = CategoriaUsuarioRepository.getInstance();
        this.cursoRepository = CursoRepository.getInstance();
    }

    private calcularDigitoVerificador(cpf: string, digito: string, peso: number): boolean {

        let soma = 0;
        for (let i = 0; i < cpf.length; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        let resto = soma % 11;
        let digitoVerificador = resto < 2 ? 0 : 11 - resto;

        return digito === digitoVerificador.toString();

    }

    private validarCpf(cpf: string): boolean {
        
        // Verifica se o CPF tem 11 dígitos
        if (!cpf || cpf.length !== 11) {
            return false;
        }

        // Verifica se todos os dígitos são iguais (ex: 11111111111)
        if (/^(\d)\1{10}$/.test(cpf)) {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let primeiroDigito = this.calcularDigitoVerificador(cpf.slice(0, 9), cpf[9], 10);

        // Calcula o segundo dígito verificador
        let segundoDigito = this.calcularDigitoVerificador(cpf.slice(0, 10), cpf[10], 11);

        // Retorna verdadeiro se ambos os dígitos verificadores estiverem corretos
        if (!primeiroDigito || !segundoDigito) {
            return false;
        }

        return true;

    }

    public criarUsuario(nome: string, cpf: string, categoriaId: number, cursoId: number): Usuario {

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

        // Verifica se cpf já existe
        if (this.usuarioRepository.getListaUsuarios().some(usuario => usuario.cpf === cpf)) {
            throw new Error("CPF já cadastrado.");
        }

        // Verifica se a categoria existe
        if (!this.categoriaUsuario.getListaCategoriasUsuarios().some(categoria => categoria.id === categoriaId)) {
            throw new Error("Categoria inválida.");
        }

        // Verifica se o curso existe
        if (!this.cursoRepository.getListaCursos().some(curso => curso.id === cursoId)) {
            throw new Error("Curso inválido.");
        }

        // Cria um novo usuário com um ID único
        let id = this.usuarioRepository.getListaUsuarios().length + 1;
        let usuario = new Usuario(id, nome, cpf, categoriaId, cursoId);

        // Verifica se o usuário foi criado corretamente
        if (!usuario) {
            throw new Error("Erro ao criar o usuário.");
        }

        // Adiciona o usuário ao repositório
        this.usuarioRepository.addUsuario(usuario);

        // Retorna o usuário criado
        return usuario;
    }

    public listaUsuariosFiltro(categoriaId: number | null, cursoId: number | null): Usuario[]{

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

    }


}