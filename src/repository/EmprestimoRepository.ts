import { Emprestimo } from "../model/Emprestimo";
import { executeQuery } from "../database/mysql";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS emprestimos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            estoque_id INT NOT NULL,
            data_emprestimo DATETIME NOT NULL,
            data_devolucao DATETIME NOT NULL,
            data_entrega DATETIME NULL,
            dias_atraso INT NULL,
            suspensao_ate DATETIME NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            FOREIGN KEY (estoque_id) REFERENCES estoques(id)
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela emprestimos criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela emprestimos', err);
        }
    }

    async insertEmprestimo(emprestimo: Emprestimo): Promise<number> {
        const resultado = await executeQuery(
            `INSERT INTO emprestimos 
            (usuario_id, estoque_id, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                emprestimo.usuarioId,
                emprestimo.estoqueId,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.dataEntrega,
                emprestimo.diasAtraso,
                emprestimo.suspensaoAte
            ]
        );
        console.log('Empréstimo inserido com sucesso!', resultado);
        return resultado.insertId;
    }

    async emprestimosEmAberto(usuarioId: number): Promise<number> {
        const rows = await executeQuery(
            `SELECT COUNT(*) AS total FROM emprestimos WHERE usuario_id = ? AND data_entrega IS NULL`,
            [usuarioId]
        );
        return rows[0]?.total ?? 0;
    }
}
/*
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

    public qtdeEmprestada(estoqueId: number): number{

        return this.getListaEmprestimos().filter( e => !e.dataDevolucao && e.estoqueId === estoqueId).length;

    }

}*/