import express from 'express';
import { CategoriaLivroService } from './service/CategoriaLivroService';
import { CategoriaUsuarioService } from './service/CategoriaUsuarioService';
import { CursoService } from './service/CursoService';
import { EmprestimoService } from './service/EmprestimoService';

// Inicializa o Express e define a porta
const app = express();
const port = 3090;
app.use(express.json());

// Função para logar informações quando o servidor é iniciado
function logInfo() {
  console.log('Servidor iniciado com sucesso!');
  console.log('Acesse a biblioteca em http://localhost:3090/libary');
}

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
cs.criarCurso("ADS", "Analise e desenvolvimento de sistemas");
cs.criarCurso("Pedag", "Pedagogia");
cs.criarCurso("ADM", "Administracao");

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
  let es = new EmprestimoService();

  es.
  
}, 5 * 60 * 1000);

// Inicia o servidor na porta especificada e chama a função de log
app.listen(port, logInfo);