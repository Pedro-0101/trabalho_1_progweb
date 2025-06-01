import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { Request, Response } from "express";

const categoriaUsuarioService = new CategoriaUsuarioService();

export class CategoriaUsuarioController {

    public async criarCategoriaUsuario(req: Request, res: Response): Promise<CategoriaUsuario | void> {
        try {
            const { nome } = req.body; // Obtém o nome da categoria do corpo da requisição

            // Cria a categoria
            const categoriaUsuario: CategoriaUsuario = await categoriaUsuarioService.criarCategoriaUsuario(nome);

            // Retorna a categoria criada com status 201 (Created)
            res.status(201).json(categoriaUsuario);

        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Erro ao criar a categoria."
            });
        }
    }

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