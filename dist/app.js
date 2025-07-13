"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./route/routes");
const swagger_1 = require("./config/swagger");
// Inicializa o Express e define a porta
const app = (0, express_1.default)();
const port = 3040;
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
(0, routes_1.RegisterRoutes)(apiRouter);
app.use('/api', apiRouter);
(0, routes_1.RegisterRoutes)(app);
(0, swagger_1.setupSwagger)(app);
// Função para logar informações quando o servidor é iniciado
function logInfo() {
    console.log('Servidor iniciado com sucesso!');
    console.log('Acesse a biblioteca em http://localhost:3090/libary');
}
/*
//Funcao para cadastrar cursos, categorias de livros e usuarios conforme instrucoes

// Categorias de livro
const cls = new CategoriaLivroService();
cls.criarCategoriaLivro("Romance");
cls.criarCategoriaLivro("Computacao");
cls.criarCategoriaLivro("Letras");
cls.criarCategoriaLivro("Gestao");

// Categorias de usuario
const cus = new CategoriaUsuarioService();
cus.criarCategoriaUsuario("Professor");
cus.criarCategoriaUsuario("Aluno");
cus.criarCategoriaUsuario("Bibliotecario");

// Cursos
const cs = new CursoService();
cs.criarCurso("ADS");
cs.criarCurso("ENG");
cs.criarCurso("ADM");

/* Rotas */
/*
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
  let es = new EmprestimoService();

  es.verificarEmprestimos();
  
}, 5 * 60 * 1000);
*/
// Inicia o servidor na porta especificada e chama a função de log
app.listen(port, logInfo);
