import { LivroController } from "../controller/LivroController";
import express, { Request, Response } from 'express';
let router = express.Router();

/**
* POST / - Adiciona novo livro ao acervo
    *Campos obrigatórios: título, ISBN, autor, editora, edição, categoria.
* GET / - Lista todos os livros (com filtros).
* GET /:isbn - Mostra detalhes de um livro.
* PUT /:isbn - Atualiza informações do livro.
* DELETE /:isbn - Remove livro (se não estiver emprestado).
*/

// Rota para cadastrar um novo livro
router.post('/', async (req: Request, res: Response) => {
    const livroController = new LivroController();
    try {
        const novoLivro = await livroController.adicionarLivro(req.body);
        res.status(201).json(novoLivro);
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
        res.status(500).json({ message: 'Erro ao adicionar livro', error });
    }
});

// Rota para retornar lista de livros, com filtro
router.get('/', async (req: Request, res: Response) => {

});

// Rota para retornar detalhes de um livro
router.get('/:isbn', async (req: Request, res: Response) => {

});

// Rota para atualizar informacoes de um livro
router.put('/:isbn', async (req: Request, res: Response) => {

});

// Rota para excluir um livro se nao estiver emprestado
router.delete('/:isbn', async (req: Request, res: Response) => {
    
})



module.exports = router;