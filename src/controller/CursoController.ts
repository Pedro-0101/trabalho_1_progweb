import { CursoService } from "../service/CursoService";
import { Curso } from "../model/Curso";
import { Request, Response } from "express";

export class CursoController {
  private cursoService: CursoService;

  constructor() {
    this.cursoService = new CursoService();
  }

  public async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const cursos: Curso[] = await this.cursoService.listarCursos();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar cursos", error });
    }
  }
}