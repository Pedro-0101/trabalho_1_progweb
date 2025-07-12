import { Livro } from '../model/Livro';
import { executeQuery } from '../database/mysql'

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

    private async createTable(){
        const query = `CREATE TABLE IF NOT EXISTS livros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            editora VARCHAR(255) NOT NULL,
            edicao VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            categoria_id INT NOT NULL,
            FOREIGN KEY (categoria_id) REFERENCES categoriasLivro(id)
        )`;
        try{
            const resultado = await executeQuery(query, []);
            console.log('Tabela usuarios criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela usuario', err);
        }
    }

    async insertLivro(livro: Livro): Promise<Livro> {

        const resultado = await executeQuery(
            'INSERT INTO livros(titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)', 
            []
        );
        console.log('Usuario inserido com sucesso!', resultado);
        livro.id = resultado.insertId;
        return livro;
        
    }
/*
    public getListaLivros(): Livro[] {
        return this.listaLivros;
    }

    public getLivroById(id: number): Livro {

        if (id < 0) {
            throw new Error("ID inválido");
        }
        if (id >= this.listaLivros.length) {
            throw new Error("Livro não encontrado");
        }
        if (this.listaLivros.length === 0) {
            throw new Error("Nenhum livro cadastrado");
        }
        const livro = this.listaLivros.find(l => l.id === id);
        if (!livro) {
            throw new Error(`Livro com ID ${id} não encontrado`);
        }
        return livro;
        
    }

    public getLivroByIsbn(isbn: string): Livro {
        const livro = this.listaLivros.find(l => l.isbn === isbn);
        if (!livro) {
            throw new Error(`Livro com ISBN ${isbn} não encontrado`);
        }
        return livro;
    }

    public atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Livro {
        const livro = this.getLivroByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro nao encontrado");
        }

        livro.titulo = titulo;
        livro.autor = autor;
        livro.editora = editora;
        livro.edicao = edicao;
        livro.categoriaId = categoriaId;

        return livro;
    }

    public deletarLivro(isbn: string): boolean {
        const index = this.listaLivros.findIndex(l => l.isbn === isbn);
        if (index === -1) {
            return false;
        }
        this.listaLivros.splice(index, 1);
        return true;
    }
*/
}