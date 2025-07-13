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
            FOREIGN KEY (categoria_id) REFERENCES categoriasUsuario(id),
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
        const resultado = await executeQuery(
            'INSERT INTO usuarios(nome, cpf, ativo, categoria_id, curso_id) VALUES (?, ?, ?, ?, ?)',
            [usuario.nome, usuario.cpf, usuario.ativo, usuario.categoriaId, usuario.cursoId]
        );

        console.log('Usuário inserido com sucesso!', resultado);
        return resultado.insertId;
    }

    async getUsuarioByCpf(cpf: string): Promise<Usuario | null> {
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
    }
}
    /*
    public getListaUsuarios(): Usuario[] {
        return this.listaUsuarios;
    }

    public addUsuario(usuario: Usuario): void {
        this.listaUsuarios.push(usuario);
    }

    public getUsuarioById(id: number): Usuario | undefined {
        return this.listaUsuarios.find(usuario => usuario.id === id);
    }

    public getUsuarioByCpf(cpf: string): Usuario{

        if(!cpf){
            throw new Error("CPF invalido");
        }

        const usuario = this.getListaUsuarios().find( u => u.cpf === cpf);

        if(usuario){
            return usuario;
        }else{
            throw new Error("Usuario nao encontrado");
        }

    }

    public atualizaUsuario(nome: string, cpf: string, categoriaId: number, cursoId: number): Usuario{

        const usuario = this.getUsuarioByCpf(cpf);

        if(!usuario){
            throw new Error("Erro ao atualizar usuario");
        }

        usuario.nome = nome;
        usuario.cpf = cpf;
        usuario.categoriaId = categoriaId;
        usuario.cursoId = cursoId;

        return usuario;
    }

    public removeUsuario(cpf: string): void{

        const usuario = this.getUsuarioByCpf(cpf);

        if(!usuario){
            throw new Error("Erro ao remover usuario: Usuario nao encontrado");
        }

        const index = this.listaUsuarios.findIndex( u => u.cpf === cpf);
        this.listaUsuarios.splice(index, 1);

    }
}*/