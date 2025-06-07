import { CategoriaLivroController } from '../controller/CategoriaLivroController';
import { CategoriaUsuarioController } from '../controller/CategoriaUsuarioController';
import { CursoController } from '../controller/CursoController';
import express, { Request, Response } from 'express';
let router = express.Router();


/*

* GET /categorias-usuario - Lista tipos de usuário.
* GET /categorias-livro - Lista categorias de livros.
* GET /cursos - Lista cursos disponíveis.

*/

// Define os controladores de categoria de livro, usuario e curso
const categoriaLivroController = new CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController();
const cursoController = new CursoController();


// Rota para listar categorias de livro
router.get('/categorias-livro', (req: Request, res: Response) => {
  categoriaLivroController.listarCategorias(req, res);
  console.log('Listando todas as categorias de livro');
});

// Rota para listar tipos de usuário
router.get('/categorias-usuario', (req: Request, res: Response) => {
  categoriaUsuarioController.listarCategoriasUsuarios(req, res);
  console.log('Listando todos os tipos de usuário');
});

// Rota para listar cursos disponíveis
router.get('/cursos', (req: Request, res: Response) => {
  cursoController.listarCursos(req, res);
  console.log('Listando todos os cursos disponíveis');  
});

module.exports = router;