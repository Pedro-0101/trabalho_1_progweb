import { CategoriaLivro } from "../model/CategoriaLivro";
import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Request, Response } from "express";

const categoriaLivroService = new CategoriaLivroService();

export class CategoriaLivroController {

    public async listarCategorias(req: Request, res: Response): Promise<CategoriaLivro[] | void> {
        try {
            // Lista todas as categorias
            const categorias: CategoriaLivro[] = await categoriaLivroService.listarCategorias();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar as categorias."
            });
        }
    }

}