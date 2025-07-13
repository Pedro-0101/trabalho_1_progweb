"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./route/routes");
const swagger_1 = require("./config/swagger");
const UsuarioService_1 = require("./service/UsuarioService");
// Inicializa o Express e define a porta
const app = (0, express_1.default)();
const port = 3040;
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
(0, routes_1.RegisterRoutes)(apiRouter);
app.use('/api', apiRouter);
(0, routes_1.RegisterRoutes)(app);
(0, swagger_1.setupSwagger)(app);
function verificarSuspensoesPeriodicamente() {
    const usuarioService = new UsuarioService_1.UsuarioService();
    // Funcao que verifica suspensoes e atualiza status dos usuarios
    usuarioService.verificarEAtualizarStatusUsuarios()
        .then(() => console.log('Verificação de suspensões concluída.'))
        .catch(console.error);
}
// Configura para rodar a verificao a cada 1 hora
setInterval(verificarSuspensoesPeriodicamente, 3600000);
// Função para logar informacoes quando o servidor e iniciado
function logInfo() {
    console.log('Servidor iniciado com sucesso!');
    console.log('Acesse a documentacao da api em http://localhost:3040/api-docs');
    verificarSuspensoesPeriodicamente(); // Roda a verificacao ao iniciar o servidor
}
// Inicia o servidor na porta especificada
app.listen(port, logInfo);
