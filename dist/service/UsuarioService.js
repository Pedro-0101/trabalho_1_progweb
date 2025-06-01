"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
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
        let usuario = new Usuario_1.Usuario(id, nome, cpf, categoriaId, cursoId);
        // Verifica se o usuário foi criado corretamente
        if (!usuario) {
            throw new Error("Erro ao criar o usuário.");
        }
        // Adiciona o usuário ao repositório
        this.usuarioRepository.addUsuario(usuario);
        // Retorna o usuário criado
        return usuario;
    }
}
exports.UsuarioService = UsuarioService;
