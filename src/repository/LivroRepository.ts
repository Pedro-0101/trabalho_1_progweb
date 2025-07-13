import { Livro } from '../model/entity/Livro';
import { executeQuery } from '../database/mysql';

export class LivroRepository {
    private static instance: LivroRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS livros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            editora VARCHAR(255) NOT NULL,
            edicao VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            categoria_id INT NOT NULL,
            UNIQUE (isbn),
            CONSTRAINT u_livro UNIQUE(autor, editora, edicao),
            FOREIGN KEY (categoria_id) REFERENCES categorias_livro(id)
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela livros criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela livros', err);
        }
    }

    async insertLivro(livro: Livro): Promise<number> {
        try {
            const resultado = await executeQuery(
                'INSERT INTO livros(titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
                [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoriaId]
            );
            console.log('Livro inserido com sucesso!', resultado);
            return resultado.insertId;
        } catch (err) {
            console.error('Erro ao inserir livro:', err);
            throw err;
        }
    }

    async getLivroByIsbn(isbn: string): Promise<Livro | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM livros WHERE isbn = ?',
                [isbn]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];

            return new Livro(
                row.titulo,
                row.autor,
                row.editora,
                row.edicao,
                row.isbn,
                row.categoria_id,
                row.id
            );
        } catch (err) {
            console.error('Erro ao buscar livro por ISBN:', err);
            throw err;
        }
    }

    async getLivroById(livroId: number): Promise<Livro | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM livros WHERE id = ?',
                [livroId]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];

            return new Livro(
                row.titulo,
                row.autor,
                row.editora,
                row.edicao,
                row.isbn,
                row.categoria_id,
                row.id
            );
        } catch (err) {
            console.error('Erro ao buscar livro por ID:', err);
            throw err;
        }
    }

    async getLivroAEE(autor: string, editora: string, edicao: string): Promise<Livro | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM livros WHERE autor = ? AND editora = ? AND edicao = ?',
                [autor, editora, edicao]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];

            return new Livro(
                row.titulo,
                row.autor,
                row.editora,
                row.edicao,
                row.isbn,
                row.categoria_id,
                row.id
            );
        } catch (err) {
            console.error('Erro ao buscar livro por autor, editora e edição:', err);
            throw err;
        }
    }

    async getLivros(): Promise<Livro[] | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM livros',
                []
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            return rows;
        } catch (err) {
            console.error('Erro ao buscar livros:', err);
            throw err;
        }
    }

    async atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Promise<Livro | null> {
        try {
            const resultado = await executeQuery(
                'UPDATE livros SET titulo = ?, autor = ?, editora = ?, edicao = ?, isbn = ?, categoria_id = ? WHERE isbn = ?',
                [titulo, autor, editora, edicao, isbn, categoriaId, isbn]
            );
            if (resultado.affectedRows === 0) {
                return null;
            }
            return await this.getLivroByIsbn(isbn);
        } catch (err) {
            console.error('Erro ao atualizar livro:', err);
            throw err;
        }
    }

    async deletarLivro(isbn: string): Promise<boolean> {
        try {
            const resultado = await executeQuery(
                'DELETE FROM livros WHERE isbn = ?',
                [isbn]
            );
            if (resultado.affectedRows === 0) {
                return false;
            }
            return true;
        } catch (err) {
            console.error('Erro ao deletar livro:', err);
            throw err;
        }
    }
}