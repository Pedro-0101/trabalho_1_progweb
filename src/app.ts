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
  console.log('Acesse a documentacao da api em http://localhost:3040/api-docs');
}

// Inicia o servidor na porta especificada
app.listen(port, logInfo);