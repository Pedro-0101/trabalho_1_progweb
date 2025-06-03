import { EmprestimoService } from "../service/EmprestimoService";
import { Emprestimo } from "../model/Emprestimo";
import e, { Request, Response } from "express";

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    public async registrarEmprestimo(req: Request, res: Response): Promise<Emprestimo | void> {
        try {
            const novoEmprestimo = await this.emprestimoService.registrarEmprestimo(req.body.cpf, req.body.codigoExemplar, new Date());
            res.status(201).json(novoEmprestimo);
        } catch (error) {
            res.status(500).json({ message: "Erro ao registrar empréstimo", error });
        }
    }

    public async listarEmprestimos(req: Request, res: Response): Promise<Emprestimo[] | void> {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            res.status(200).json(emprestimos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar empréstimos", error });
        }
    }

    public async registrarDevolucao(req: Request, res: Response, id: string): Promise<Emprestimo | void> {
        try {
            const emprestimo = await this.emprestimoService.registrarDevolucao(parseInt(id));
            res.status(200).json(emprestimo);
        } catch (error) {
            res.status(500).json({ message: "Erro ao registrar devolução", error });
        }
    }

    
}