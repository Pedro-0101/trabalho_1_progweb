import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { Request, Response } from "express";

const categoriaUsuarioService = new CategoriaUsuarioService();

export class CategoriaUsuarioController {

    public async listarCategoriasUsuarios(req: Request, res: Response): Promise<CategoriaUsuario[] | void> {
        try {
            // Lista todas as categorias
            const categorias: CategoriaUsuario[] = await categoriaUsuarioService.listarCategoriasUsuarios();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao listar as categorias."
            });
        }
    }
}