"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
class CategoriaUsuarioController {
    listarCategoriasUsuarios(req, res) {
        try {
            // Lista todas as categorias
            const categorias = categoriaUsuarioService.listarCategoriasUsuarios();
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar as categorias."
            });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
