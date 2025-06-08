"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaLivroController_1 = require("../controller/CategoriaLivroController");
const CategoriaUsuarioController_1 = require("../controller/CategoriaUsuarioController");
const CursoController_1 = require("../controller/CursoController");
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
/*

* GET /categorias-usuario - Lista tipos de usuário.
* GET /categorias-livro - Lista categorias de livros.
* GET /cursos - Lista cursos disponíveis.

*/
// Define os controladores de categoria de livro, usuario e curso
const categoriaLivroController = new CategoriaLivroController_1.CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController_1.CategoriaUsuarioController();
const cursoController = new CursoController_1.CursoController();
// Rota para listar categorias de livro
router.get('/categorias-livro', (req, res) => {
    categoriaLivroController.listarCategorias(req, res);
    console.log('Listando todas as categorias de livro');
});
// Rota para listar tipos de usuário
router.get('/categorias-usuario', (req, res) => {
    categoriaUsuarioController.listarCategoriasUsuarios(req, res);
    console.log('Listando todos os tipos de usuário');
});
// Rota para listar cursos disponíveis
router.get('/cursos', (req, res) => {
    cursoController.listarCursos(req, res);
    console.log('Listando todos os cursos disponíveis');
});
module.exports = router;
