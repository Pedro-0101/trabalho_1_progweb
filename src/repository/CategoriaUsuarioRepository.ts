import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";
import { executeQuery } from "../database/mysql";

export class CategoriaUsuarioRepository {
    private static instance: CategoriaUsuarioRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): CategoriaUsuarioRepository {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS categorias_usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela categorias_usuario criada com sucesso: ', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela categorias_usuario', err);
        }
    }

    async insertCategoriaUsuario(categoriaUsuario: CategoriaUsuario): Promise<number> {
        const resultado = await executeQuery(
            'INSERT INTO categorias_usuario(nome) VALUES (?)',
            [categoriaUsuario.nome]
        );
        console.log('Categoria de usuário inserida com sucesso!', resultado);
        return resultado.insertId;
    }

    async getCategoriaUsuarioById(categoriaId: number): Promise<CategoriaUsuario | null> {

        const rows = await executeQuery(
            'SELECT * FROM categorias_usuario WHERE id = ?',
            [categoriaId]
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        const row = rows[0];

        return new CategoriaUsuario(
            row.nome,
            row.id
        );

    }

    async getCategoriasUsuario(): Promise<CategoriaUsuario[] | null> {
        const rows = await executeQuery(
        'SELECT * FROM categorias_usuario',
        []
    );

    if (!rows || rows.length === 0) {
        return null;
    }

    return rows;

    }
}