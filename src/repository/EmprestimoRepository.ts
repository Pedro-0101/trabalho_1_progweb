import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private listaEmprestimos: Emprestimo[] = [];

    private constructor() {}

    public static getInstance(): EmprestimoRepository {
        if (!EmprestimoRepository.instance) {
            EmprestimoRepository.instance = new EmprestimoRepository();
        }
        return EmprestimoRepository.instance;
    }

    public getListaEmprestimos(): Emprestimo[] {
        return this.listaEmprestimos;
    }

    public addEmprestimo(emprestimo: Emprestimo): void {
        this.listaEmprestimos.push(emprestimo);
    }

    public getEmprestimoById(id: number): Emprestimo | undefined {
        return this.listaEmprestimos.find(emprestimo => emprestimo.id === id);
    }

    public emprestimosEmAberto(usuarioId: number): number {
        return this.listaEmprestimos.filter(emprestimo => emprestimo.usuarioId === usuarioId && !emprestimo.dataDevolucao).length;
    }

}