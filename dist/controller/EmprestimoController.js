"use strict";
/*import { EmprestimoService } from "../service/EmprestimoService";
import { Emprestimo } from "../model/Emprestimo";
import e, { Request, Response } from "express";

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    public registrarEmprestimo(req: Request, res: Response): void {
        try {
            const novoEmprestimo = this.emprestimoService.registrarEmprestimo(req.body.cpf, req.body.codigoExemplar, new Date());
            res.status(201).json(novoEmprestimo);
        } catch (error) {
            res.status(500).json({ message: "Erro ao registrar empréstimo", error });
        }
    }

    public listarEmprestimos(req: Request, res: Response): Emprestimo[] | void {
        try {
            const emprestimos = this.emprestimoService.listarEmprestimos();
            res.status(200).json(emprestimos);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar empréstimos", error });
        }
    }

    public registrarDevolucao(req: Request, res: Response, id: string): Emprestimo | void {
        try {
            const emprestimo = this.emprestimoService.registrarDevolucao(parseInt(id));
            res.status(200).json(emprestimo);
        } catch (error) {
            res.status(500).json({ message: "Erro ao registrar devolução", error });
        }
    }

    
}*/ 
