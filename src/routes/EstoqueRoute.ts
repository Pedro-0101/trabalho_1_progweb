import { EstoqueController } from "../controller/EstoqueController";
import express, { Request, Response } from 'express';
let router = express.Router();

/*
*   POST / - Cadastra novo exemplar
    *   Campos obrigatórios: ISBN livro, código exemplar
*   GET / - Lista exemplares com disponibilidade.
*   GET /:codigo - Detalhes do exemplar.
*   PUT /:codigo - Atualiza disponibilidade.
*   DELETE /:codigo - Remove exemplar (se não estiver emprestado).
*/


// Rota para cadastrar um novo exemplar
router.post('/', async (req: Request, res: Response) => {
    const estoqueController = new EstoqueController();
    try {
        const novoExemplar = await estoqueController.registrarEstoque(req, res);
        res.status(201).json(novoExemplar);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar exemplar', error });
    }
});

// Rota para listar todos os exemplares com disponibilidade
router.get('/', async (req: Request, res: Response) => {
    const estoqueController = new EstoqueController();
    try {
        const estoques = await estoqueController.listarEstoque(req, res);
        res.status(200).json(estoques);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar exemplares', error });
    }
});

// Rota para obter detalhes de um exemplar específico
router.get('/:codigo', async (req: Request, res: Response) => {
    const estoqueController = new EstoqueController();
    const codigo = Number(req.params.codigo);

    try {
        const estoque = await estoqueController.getByCodigo(codigo);
        if (estoque) {
            res.status(200).json(estoque);
        } else {
            res.status(404).json({ message: 'Exemplar não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar exemplar', error });
    }
});

// Rota para atualizar a disponibilidade de um exemplar
router.put('/:codigo', async (req: Request, res: Response) => {
    const estoqueController = new EstoqueController();
    const codigo = Number(req.params.codigo);
    try {
        const estoqueAtualizado = await estoqueController.atualizaDisponibilidade(codigo);
        res.status(200).json(estoqueAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar exemplar', error });
    }
});

// Rota para remover um exemplar
router.delete('/:codigo', async (req: Request, res: Response) => {
    const estoqueController = new EstoqueController();
    const codigo = Number(req.params.codigo);
    try {
        await estoqueController.deletarEstoque(codigo, res);
        // Se a remoção for bem-sucedida returna 204 No Content
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover exemplar', error });
    }
});

module.exports = router;