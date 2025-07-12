import { CategoriaUsuario } from "../model/CategoriaUsuario";
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
        const query = `CREATE TABLE IF NOT EXISTS categoriasUsuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela categoriasUsuario criada com sucesso: ', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela categoriasUsuario', err);
        }
    }

    async insertCategoriaUsuario(categoriaUsuario: CategoriaUsuario): Promise<number> {
        const resultado = await executeQuery(
            'INSERT INTO categoriasUsuario(nome) VALUES (?)',
            [categoriaUsuario.nome]
        );
        console.log('Categoria de usuário inserida com sucesso!', resultado);
        return resultado.insertId;
    }

    async getCategoriaUsuarioById(categoriaId: number): Promise<CategoriaUsuario | null> {

        const rows = await executeQuery(
            'SELECT * FROM categoriasUsuario WHERE id = ?',
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
}
 

    /*
    public getListaCategoriasUsuarios(): CategoriaUsuario[] {
        return this.listaCategoriasUsuarios;
    }
    
    public addCategoriaUsuario(categoria: CategoriaUsuario): void {
        this.listaCategoriasUsuarios.push(categoria);
    }

    public getCategoriaUsuarioById(id: number): CategoriaUsuario | undefined {
        return this.listaCategoriasUsuarios.find(categoria => categoria.id === id);
    }
    */