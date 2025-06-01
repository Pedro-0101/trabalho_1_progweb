"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Inicializa o Express e define a porta
const app = (0, express_1.default)();
const port = 3090;
app.use(express_1.default.json());
// Função para logar informações quando o servidor é iniciado
function logInfo() {
    console.log('Servidor iniciado com sucesso!');
    console.log('Acesse a biblioteca em http://localhost:3090/libary');
}
/* Rotas */
// Define os gerenciadores de rotas
var indexRouter = require('./routes/IndexRoute');
var catalogosRouter = require('./routes/CatalogoRoute');
var emprestimosRouter = require('./routes/EmprestimoRoute');
var livrosRouter = require('./routes/LivroRoute');
var usuariosRouter = require('./routes/UsuarioRoute');
// Usa as rotas definidas
app.use('/libary', indexRouter);
app.use('/libary/catalogos', catalogosRouter);
app.use('/libary/emprestimos', emprestimosRouter);
app.use('/libary/livros', livrosRouter);
app.use('/libary/usuarios', usuariosRouter);
// Inicia o servidor na porta especificada e chama a função de log
app.listen(port, logInfo);
