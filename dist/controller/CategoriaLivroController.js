"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
const categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
class CategoriaLivroController {
    listarCategorias(req, res) {
        try {
            // Lista todas as categorias
            const categorias = categoriaLivroService.listarCategorias();
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar as categorias."
            });
        }
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
