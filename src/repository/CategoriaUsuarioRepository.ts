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

    private async createTable(){
        const query = `CREATE TABLE IF NOT EXISTS categoriaUsuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;
        try{
            const resultado = await executeQuery(query, []);
            console.log('Tabela categoriaUsuario criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela categoriaUsuario', err);
        }
    }

    async insertCategoriaUsuario(nome: string): Promise<CategoriaUsuario>{
        const resultado = await executeQuery(
            'INSERT INTO categoriaUsuario(nome) VALUES (?)', 
            [nome]
        );
        console.log('Categoria de usuario inserida com sucesso!', resultado);
        return new CategoriaUsuario(resultado.insertId, nome);
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
}