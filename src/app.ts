import express from 'express';
import { RegisterRoutes } from './route/routes';
import { setupSwagger } from './config/swagger';
import { UsuarioService } from './service/UsuarioService';

// Inicializa o Express e define a porta
const app = express();
const port = 3040;
app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);
RegisterRoutes(app);
setupSwagger(app);

function verificarSuspensoesPeriodicamente() {
  const usuarioService = new UsuarioService();
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