import express, { Request, Response } from 'express';
import { EmprestimoController } from '../controller/EmprestimoController';
let router = express.Router();

/*

* POST / - Registra novo empréstimo
    * Campos obrigatórios: CPF usuário, código exemplar.
    * Valida todas as regras de negócio.

* GET / - Lista todos os empréstimos (ativos/histórico).
* PUT /:id/devolucao - Registra devolução de livro.

*/


const emprestimoController = new EmprestimoController();

// Rota para registrar novo empréstimo
router.post('/', (req: Request, res: Response) => {
    emprestimoController.registrarEmprestimo(req, res);
    console.log('Registrando novo empréstimo');
});

// Rota para listar todos os empréstimos
router.get('/', (req: Request, res: Response) => {
    emprestimoController.listarEmprestimos(req, res);
    console.log('Listando todos os empréstimos');
});

// Rota para registrar devolução de livro
router.put('/:id/devolucao', (req: Request, res: Response) => {
    const id = req.params.id;
    emprestimoController.registrarDevolucao(req, res, id);
    console.log(`Registrando devolução do empréstimo com ID: ${id}`);
});


module.exports = router;