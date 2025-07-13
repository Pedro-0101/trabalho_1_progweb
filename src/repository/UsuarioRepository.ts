import { Usuario } from "../model/entity/Usuario";
import { executeQuery } from "../database/mysql";

export class UsuarioRepository {
    private static instance: UsuarioRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            cpf VARCHAR(255) NOT NULL,
            ativo VARCHAR(255) NOT NULL,
            categoria_id INT NOT NULL,
            curso_id INT NOT NULL,
            UNIQUE (cpf),
            FOREIGN KEY (categoria_id) REFERENCES categorias_usuario(id),
            FOREIGN KEY (curso_id) REFERENCES cursos(id)
        )`;
        try {
            const resultado = await executeQuery(query, []);
            console.log('Tabela usuarios criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela usuarios', err);
        }
    }

    async insertUsuario(usuario: Usuario): Promise<number> {
        try {
            const resultado = await executeQuery(
                'INSERT INTO usuarios(nome, cpf, ativo, categoria_id, curso_id) VALUES (?, ?, ?, ?, ?)',
                [usuario.nome, usuario.cpf, usuario.ativo, usuario.categoriaId, usuario.cursoId]
            );
            console.log('Usuário inserido com sucesso!', resultado);
            return resultado.insertId;
        } catch (err) {
            console.error('Erro ao inserir usuário:', err);
            throw err;
        }
    }

    async getUsuarioByCpf(cpf: string): Promise<Usuario | null> {
        try {
            const rows = await executeQuery(
                'SELECT * FROM usuarios WHERE cpf = ?',
                [cpf]
            );

            if (!rows || rows.length === 0) {
                return null;
            }

            const row = rows[0];

            return new Usuario(
                row.nome,
                row.cpf,
                row.ativo,
                row.categoria_id,
                row.curso_id,
                row.id
            );
        } catch (err) {
            console.error('Erro ao buscar usuário por CPF:', err);
            throw err;
        }
    }

    async getUsuarios(categoriaId?: number, cursoId?: number): Promise<Usuario[] | null> {
        try {

            const conditions: string[] = [];
            const params: any[] = [];

            if (categoriaId) {
                conditions.push("categoria_id = ?");
                params.push(categoriaId);
            }
            if (cursoId) {
                conditions.push("curso_id = ?");
                params.push(cursoId);
            }

            let query = 'SELECT * FROM usuarios';
            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
            const rows = await executeQuery(query, params);

            if (!rows || rows.length === 0) {
                return null;
            }
            return rows;

        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            throw err;
        }
    }

    async atualizarUsuario(nome: string, cpf: string, ativo: string, categoriaId: number, cursoId: number): Promise<Usuario | null> {
        try {
            const resultado = await executeQuery(
                'UPDATE usuarios SET nome = ?, cpf = ?, ativo = ?, categoria_id = ?, curso_id = ? WHERE cpf = ?',
                [nome, cpf, ativo, categoriaId, cursoId, cpf]
            );
            if (resultado.affectedRows === 0) {
                return null;
            }
            return await this.getUsuarioByCpf(cpf);
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            throw err;
        }
    }

    async deletarUsuario(cpf: string): Promise<Boolean> {
        try {
            const resultado = await executeQuery(
                'DELETE FROM usuarios WHERE cpf = ?',
                [cpf]
            );
            if (resultado.affectedRows === 0) {
                return false;
            }
            return true
        } catch (err) {
            console.error('Erro ao deletar usuário:', err);
            throw err;
        }
    }
}