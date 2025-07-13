import { Emprestimo } from "../model/entity/Emprestimo";
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

    async getListaEmprestimosEmAberto(estoqueId?: number, usuarioId?: number): Promise<Emprestimo[] | null> {
    try {
        const conditions: string[] = ['data_entrega IS NULL'];
        const params: any[] = [];

        if (estoqueId) {
            conditions.push('estoque_id = ?');
            params.push(estoqueId);
        }
        if (usuarioId) {
            conditions.push('usuario_id = ?');
            params.push(usuarioId);
        }

        let query = 'SELECT * FROM emprestimos WHERE ' + conditions.join(' AND ');

        const rows = await executeQuery(query, params);

        if (!rows || rows.length === 0) {
            return null;
        }

        return (rows as any[]).map(row => new Emprestimo(
            row.usuario_id,
            row.estoque_id,
            new Date(row.data_emprestimo),
            new Date(row.data_devolucao),
            row.data_entrega ? new Date(row.data_entrega) : null,
            row.dias_atraso,
            row.suspensao_ate ? new Date(row.suspensao_ate) : null,
            row.id
        ));
    } catch (err) {
        console.error('Erro ao buscar empréstimos em aberto', err);
        return null;
    }
}

    async getListaEmprestimosFechados(estoqueId?: number, usuarioId?: number): Promise<Emprestimo[] | null> {
    try {
        const conditions: string[] = ['data_entrega IS NOT NULL'];
        const params: any[] = [];

        if (estoqueId) {
            conditions.push('estoque_id = ?');
            params.push(estoqueId);
        }
        if (usuarioId) {
            conditions.push('usuario_id = ?');
            params.push(usuarioId);
        }

        let query = 'SELECT * FROM emprestimos WHERE ' + conditions.join(' AND ');

        const rows = await executeQuery(query, params);

        if (!rows || rows.length === 0) {
            return null;
        }
        return rows;

    } catch (err) {
        console.error('Erro ao buscar empréstimos fechados', err);
        return null;
    }
}


}