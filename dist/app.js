"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoriaLivroService_1 = require("./service/CategoriaLivroService");
const CategoriaUsuarioService_1 = require("./service/CategoriaUsuarioService");
const CursoService_1 = require("./service/CursoService");
const EmprestimoService_1 = require("./service/EmprestimoService");
// Inicializa o Express e define a porta
const app = (0, express_1.default)();
const port = 3090;
app.use(express_1.default.json());
// Função para logar informações quando o servidor é iniciado
function logInfo() {
    console.log('Servidor iniciado com sucesso!');
    console.log('Acesse a biblioteca em http://localhost:3090/libary');
}
//Funcao para cadastrar cursos, categorias de livros e usuarios conforme instrucoes
// Categorias de livro
const cls = new CategoriaLivroService_1.CategoriaLivroService();
cls.criarCategoriaLivro("Romance");
cls.criarCategoriaLivro("Computacao");
cls.criarCategoriaLivro("Letras");
cls.criarCategoriaLivro("Gestao");
// Categorias de usuario
const cus = new CategoriaUsuarioService_1.CategoriaUsuarioService();
cus.criarCategoriaUsuario("Professor");
cus.criarCategoriaUsuario("Aluno");
cus.criarCategoriaUsuario("Bibliotecario");
// Cursos
const cs = new CursoService_1.CursoService();
cs.criarCurso("ADS");
cs.criarCurso("ENG");
cs.criarCurso("ADM");
/* Rotas */
// Define os gerenciadores de rotas
var indexRouter = require('./routes/IndexRoute');
var catalogosRouter = require('./routes/CatalogoRoute');
var emprestimosRouter = require('./routes/EmprestimoRoute');
var estoquesRouter = require('./routes/EstoqueRoute');
var livrosRouter = require('./routes/LivroRoute');
var usuariosRouter = require('./routes/UsuarioRoute');
// Usa as rotas definidas
app.use('/libary', indexRouter);
app.use('/libary/catalogos', catalogosRouter);
app.use('/libary/emprestimos', emprestimosRouter);
app.use('/libary/estoque', estoquesRouter);
app.use('/libary/livros', livrosRouter);
app.use('/libary/usuarios', usuariosRouter);
setInterval(() => {
    console.log('Executando verificao de emprestimos');
    let es = new EmprestimoService_1.EmprestimoService();
    es.verificarEmprestimos();
}, 5 * 60 * 1000);
// Inicia o servidor na porta especificada e chama a função de log
app.listen(port, logInfo);
