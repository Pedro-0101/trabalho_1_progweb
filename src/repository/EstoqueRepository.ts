import { Estoque } from "../model/entity/Estoque";
import { executeQuery } from "../database/mysql";

export class EstoqueRepository {
    private static instance: EstoqueRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): EstoqueRepository {
        if (!EstoqueRepository.instance) {
            EstoqueRepository.instance = new EstoqueRepository();
        }
        return EstoqueRepository.instance;
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS estoques (
            id INT AUTO_INCREMENT PRIMARY KEY,
            livro_id INT NOT NULL,
            quantidade INT NOT NULL,
            quantidade_emprestada INT NOT NULL,
            disponivel BOOLEAN NOT NULL,
            FOREIGN KEY (livro_id) REFERENCES livros(id)
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela estoques criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela estoques', err);
        }
    }

    async insertEstoque(estoque: Estoque): Promise<number> {
        const resultado = await executeQuery(
            'INSERT INTO estoques(livro_id, quantidade, quantidade_emprestada, disponivel) VALUES (?, ?, ?, ?)',
            [estoque.livroId, estoque.quantidade, estoque.quantidadeEmprestada, estoque.disponivel]
        );
        console.log('Estoque inserido com sucesso!', resultado);
        return resultado.insertId;
    }

    async getEstoqueByLivroId(livro_id: number): Promise<Estoque | null> {

        const rows = await executeQuery(
            'SELECT * FROM estoques WHERE livro_id = ?',
            [livro_id]
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        const row = rows[0];
        return new Estoque(
            row.livro_id,
            row.quantidade,
            row.disponivel,
            row.quantidade_emprestada,
            row.id
        );
    }

    async atualizarQuantidadeEmprestada(estoqueId: number, qtde_atualizada: number): Promise<boolean> {

        const resultado = await executeQuery(
            'UPDATE estoques SET quantidade_emprestada = ? WHERE id = ?',
            [qtde_atualizada, estoqueId]
        );
        console.log('Quantidade emprestada atualizada com sucesso', resultado);
        return true;
    }

    async getEstoqueDisponivel(disponivel: boolean, livroId?: number): Promise<Estoque[] | null> {

        const conditions: string[] = [];
        const params: any[] = [];

        conditions.push("disponivel = ?");
        params.push(disponivel);

        if (livroId) {
            conditions.push("livro_id = ?");
            params.push(livroId);
        }

        let query = 'SELECT * FROM estoques';
        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }
        const rows = await executeQuery(query, params);

        if (!rows || rows.length === 0) {
            return null;
        }
        
        interface EstoqueRow {
            id: number;
            livro_id: number;
            quantidade: number;
            quantidade_emprestada: number;
            disponivel: boolean;
        }

        return (rows as EstoqueRow[]).map((row: EstoqueRow) => new Estoque(
            row.livro_id,
            row.quantidade,
            row.disponivel,
            row.quantidade_emprestada,
            row.id
        ));

    }

    async getEstoqueById(id: number): Promise<Estoque | null> {

        const rows = await executeQuery(
            'SELECT * FROM estoques WHERE id = ?',
            [id]
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        const row = rows[0];
        return new Estoque(
            row.livro_id,
            row.quantidade,
            row.disponivel,
            row.quantidade_emprestada,
            row.id
        );
    }
}