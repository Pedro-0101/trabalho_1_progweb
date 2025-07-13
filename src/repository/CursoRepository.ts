import { Curso } from "../model/entity/Curso";
import { executeQuery } from "../database/mysql";

export class CursoRepository {
    private static instance: CursoRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): CursoRepository {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS cursos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela cursos criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela cursos', err);
        }
    }

    async insertCurso(curso: Curso): Promise<number> {
        try {
            const resultado = await executeQuery(
                'INSERT INTO cursos(nome) VALUES (?)',
                [curso.nome]
            );
            console.log('Curso inserido com sucesso!', resultado);
            return resultado.insertId;
        } catch (err) {
            console.error('Erro ao inserir curso', err);
            throw err;
        }
    }

    async getCursoById(cursoId: number): Promise<Curso | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM cursos WHERE id = ?',
                [cursoId]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];

            return new Curso(
                row.nome,
                row.id
            );
        } catch (err) {
            console.error('Erro ao buscar curso por ID', err);
            throw err;
        }
    }

    async getCursos(): Promise<Curso[] | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM cursos',
                []
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            return rows;
        } catch (err) {
            console.error('Erro ao buscar cursos', err);
            throw err;
        }
    }
}