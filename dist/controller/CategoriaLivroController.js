"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
const categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
class CategoriaLivroController {
    criarCategoriaLivro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome } = req.body; // Obtém o nome da categoria do corpo da requisição
                // Cria a categoria
                const categoriaLivro = yield categoriaLivroService.criarCategoriaLivro(nome);
                // Retorna a categoria criada com status 201 (Created)
                res.status(201).json(categoriaLivro);
            }
            catch (error) {
                res.status(400).json({
                    error: error instanceof Error ? error.message : "Erro ao criar a categoria."
                });
            }
        });
    }
    listarCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lista todas as categorias
                const categorias = yield categoriaLivroService.listarCategorias();
                res.status(200).json(categorias);
            }
            catch (error) {
                res.status(400).json({
                    error: error instanceof Error ? error.message : "Erro ao listar as categorias."
                });
            }
        });
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
