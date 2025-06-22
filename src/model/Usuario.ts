import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { textUtils } from "../utils/textUtil";

export class Usuario {
    id: number;
    nome: string;
    cpf: string;
    ativo: boolean;
    categoriaId: number;
    cursoId: number;

    private usuarioRepository: UsuarioRepository;
    private categoriaUsuario: CategoriaUsuarioRepository;
    private cursoRepository: CursoRepository;

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

    constructor(nome: string, cpf: string, categoriaId: number, cursoId: number) {

        this.usuarioRepository = UsuarioRepository.getInstance();
        this.categoriaUsuario = CategoriaUsuarioRepository.getInstance();
        this.cursoRepository = CursoRepository.getInstance();

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

        this.id = id;                  
        this.nome = nome;              
        this.cpf = cpf;                
        this.ativo = true;             
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;        

    }
}