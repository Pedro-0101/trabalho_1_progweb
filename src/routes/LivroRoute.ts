import { LivroController } from "../controller/LivroController";
import express, { Request, Response } from 'express';
import { Livro } from "../model/Livro";
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
        const novoLivro = await livroController.adicionarLivro(req);
        res.status(201).json(novoLivro);
    } catch (error) {
        console.error('Erro ao adicionar livro:', error);
        res.status(500).json({ message: 'Erro ao adicionar livro', error });
    }
});

// Rota para retornar lista de livros, com filtro(autor, editora, categoria)
router.get('/', async (req: Request, res: Response) => {
    try{
        const livroController = new LivroController();
        const filtros = req.query;
        const livros = await livroController.listarLivrosFiltro(req);
        res.status(200).json(livros);
    }catch(error){
        throw new Error("Erro ao listar livros com filtro")
    }
});

// Rota para retornar detalhes de um livro
router.get('/:isbn', async (req: Request, res: Response) => {
    try{
        const livroController = new LivroController();
        const isbn = req.body.isbn;
        const livro = await livroController.detalhesLivro(isbn);
        res.status(200).json(livro);
    }catch(error){
        throw new Error("Erro ao requisitar detalhes do livro")
    }
});

// Rota para atualizar informacoes de um livro
router.put('/:isbn', async (req: Request, res: Response) => {

    try{

        const livroController = new LivroController();
        const livroAtualizado = await livroController.atualizarLivro(req);
        res.status(200).json(livroAtualizado);

    }catch(error){
        throw new Error("Erro ao atualizar informacoes do livro")
    }
    
});

// Rota para excluir um livro se nao estiver emprestado
router.delete('/:isbn', async (req: Request, res: Response) => {

    try{

        const livroController = new LivroController();
        await livroController.deletarLivro(req.body.isbn);
        res.status(200);

    }catch(error){
        throw new Error("Erro ao deletar livro")
    }
});



module.exports = router;