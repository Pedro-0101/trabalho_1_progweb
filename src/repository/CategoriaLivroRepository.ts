import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { executeQuery } from "../database/mysql";

export class CategoriaLivroRepository {
    private static instance: CategoriaLivroRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): CategoriaLivroRepository {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS categorias_livro (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela categorias_livro criada com sucesso: ', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela categorias_livro', err);
        }
    }

    async insertCategoriaLivro(categoriaLivro: CategoriaLivro): Promise<number> {
        try {
            const resultado = await executeQuery(
                'INSERT INTO categorias_livro(nome) VALUES (?)',
                [categoriaLivro.nome]
            );
            console.log('Categoria de livro inserida com sucesso!', resultado);
            return resultado.insertId;
        } catch (err) {
            console.error('Erro ao inserir categoria de livro', err);
            return -1;
        }
    }

    async getCategoriaLivroById(categoriaId: number): Promise<CategoriaLivro | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM categorias_livro WHERE id = ?',
                [categoriaId]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];

            return new CategoriaLivro(
                row.nome,
                row.id
            );
        } catch (err) {
            console.error('Erro ao buscar categoria de livro por ID', err);
            return null;
        }
    }

    async getCategoriasLivro(): Promise<CategoriaLivro[] | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM categorias_livro',
                []
            );

            if (!rows || rows.length === 0) {
                return null;
            }
            return rows;
            
        } catch (err) {
            console.error('Erro ao buscar categorias de livro', err);
            return null;
        }
    }
}