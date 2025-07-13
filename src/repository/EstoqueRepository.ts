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
            row.id,
            row.livro_id,
            row.quantidade,
            row.quantidade_emprestada,
            row.disponivel
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
}



/*
    public getListaEstoques(): Estoque[] {
        return this.listaEstoques;
    }

    public addEstoqueExistente(livroId: number, quantidade: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidade += quantidade;
        }
    }

    public getQuantidadeLivro(livroId: number): number {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        return estoque ? estoque.quantidade : 0;
    }

    public atualizarDisponibilidade(livroId: number): Estoque | null {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.disponivel = estoque.quantidade > estoque.quantidadeEmprestada;
            return estoque;
        }
        else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByLivroId(livroId: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.livroId === livroId);
    }

    public getEstoqueById(id: number): Estoque | undefined {
        return this.listaEstoques.find(e => e.id === id);
    }

    public atualizarQuantidadeEmprestada(livroId: number, quantidade: number): void {
        const estoque = this.listaEstoques.find(e => e.livroId === livroId);
        if (estoque) {
            estoque.quantidadeEmprestada += quantidade;
            this.atualizarDisponibilidade(livroId);
        } else {
            throw new Error(`Estoque para livro com ID ${livroId} não encontrado.`);
        }
    }

    public getEstoqueByCodigo(codigo: number): Estoque | null {
        const estoque = this.listaEstoques.find(e => e.id === codigo);
        return estoque || null;
    }

    public deletarEstoque(codigo: number): void {
        const estoque = this.getEstoqueById(codigo);
        if (!estoque) {
            throw new Error(`Estoque com código ${codigo} não encontrado.`);
        }
        if(estoque.quantidadeEmprestada > 0) {
            throw new Error(`Não é possível remover o estoque com código ${codigo} porque ele está emprestado.`);
        }
        // Remove o estoque da lista
        this.listaEstoques = this.listaEstoques.filter(e => e.id !== codigo);
    }*/
