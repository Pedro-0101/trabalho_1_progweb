"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
const EmprestimoService_1 = require("./EmprestimoService");
const textUtil_1 = require("../utils/textUtil");
class UsuarioService {
    constructor() {
        this.usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
        this.categoriaUsuario = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
        this.cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    }
    calcularDigitoVerificador(cpf, digito, peso) {
        let soma = 0;
        for (let i = 0; i < cpf.length; i++) {
            soma += parseInt(cpf[i]) * peso;
            peso--;
        }
        let resto = soma % 11;
        let digitoVerificador = resto < 2 ? 0 : 11 - resto;
        return digito === digitoVerificador.toString();
    }
    validarCpf(cpf) {
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
    criarUsuario(nome, cpf, categoriaId, cursoId) {
        let usuario = new Usuario_1.Usuario(nome, cpf, categoriaId, cursoId);
        // Verifica se o usuário foi criado corretamente
        if (!usuario) {
            throw new Error("Erro ao criar o usuário.");
        }
        // Adiciona o usuário ao repositório
        this.usuarioRepository.addUsuario(usuario);
        // Retorna o usuário criado
        return usuario;
    }
    listaUsuariosFiltro(categoriaId, cursoId) {
        const listaUsuarios = this.usuarioRepository.getListaUsuarios();
        if (categoriaId) {
            listaUsuarios.filter(u => u.categoriaId === categoriaId);
        }
        if (cursoId) {
            listaUsuarios.filter(u => u.cursoId === cursoId);
        }
        return listaUsuarios;
    }
    getUsuarioByCpf(cpf) {
        const usuario = this.usuarioRepository.getUsuarioByCpf(cpf);
        if (usuario) {
            return usuario;
        }
        else {
            throw new Error("Usuario nao encontrado");
        }
    }
    atualizaUsuario(nome, cpf, categoriaId, cursoId) {
        nome = textUtil_1.textUtils.capitalizarTexto(nome);
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
        if (!this.validarCpf(cpf)) {
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
    removeUsuario(cpf) {
        const emprestimoService = new EmprestimoService_1.EmprestimoService();
        const usuario = this.usuarioRepository.getUsuarioByCpf(cpf);
        if (!usuario) {
            throw new Error("Erro ao remover usuario: Usuario nao encontrado");
        }
        const qtdeEmprestada = emprestimoService.emprestimosEmAbertoUsuario(usuario.id);
        if (qtdeEmprestada) {
            throw new Error("Erro ao remover usuario: Existem emprestimos em andamento");
        }
        this.usuarioRepository.removeUsuario(cpf);
    }
    alteraStatusUsuario(id, status) {
        const usuario = this.usuarioRepository.getUsuarioById(id);
        if (!usuario) {
            throw new Error("Usuario nao encontrado");
        }
        usuario.ativo = status;
    }
}
exports.UsuarioService = UsuarioService;
