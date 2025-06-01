import express, { Request, Response } from 'express';
let router = express.Router();



// Rota de teste para verificar se o servidor está funcionando
router.get('/', (req: Request, res: Response) => {
  res.send('Bem-vindo à Biblioteca!');
});

module.exports = router;