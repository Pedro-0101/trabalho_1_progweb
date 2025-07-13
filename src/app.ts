import express from 'express';
import { RegisterRoutes } from './route/routes';
import { setupSwagger } from './config/swagger';

// Inicializa o Express e define a porta
const app = express();
const port = 3040;
app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);
RegisterRoutes(app);
setupSwagger(app);

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

setInterval(() => {
  console.log('Executando verificao de emprestimos');
  let es = new EmprestimoService();

  es.verificarEmprestimos();
  
}, 5 * 60 * 1000);
*/

// Inicia o servidor na porta especificada e chama a função de log
app.listen(port, logInfo);