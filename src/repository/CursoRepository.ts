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
        const resultado = await executeQuery(
            'INSERT INTO cursos(nome) VALUES (?)',
            [curso.nome]
        );

        console.log('Curso inserido com sucesso!', resultado);
        return resultado.insertId;
    }

    async getCursoById(cursoId: number): Promise<Curso | null> {

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
    }

    async getCursos(): Promise<Curso[] | null> {

        const rows = await executeQuery(
            'SELECT * FROM cursos',
            []
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        return rows;

    }
}

    /*
    public getListaCursos(): Curso[] {
        return this.listaCursos;
    }
    
    public addCurso(curso: Curso): void {
        this.listaCursos.push(curso);
    }

    public getCursoById(id: number): Curso | undefined {
        return this.listaCursos.find(curso => curso.id === id);
}*/