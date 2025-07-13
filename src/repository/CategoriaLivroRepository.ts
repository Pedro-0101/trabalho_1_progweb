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

	private async createTable(){
		const query = `CREATE TABLE IF NOT EXISTS categoriasLivro (
				id INT AUTO_INCREMENT PRIMARY KEY,
				nome VARCHAR(255) NOT NULL
		)`;
		try {
			const resultado = await executeQuery(query, []);
			console.log('Tabela categoriasLivro criada com sucesso: ', resultado);
		} catch (err) {
			console.error('Erro ao criar tabela categoriasLivro', err);
		}
	}

	async insertCategoriaLivro(categoriaLivro: CategoriaLivro): Promise<number> {
		const resultado = await executeQuery(
			'INSERT INTO categoriasLivro(nome) VALUES (?)',
			[categoriaLivro.nome]
		);
		console.log('Categoria de livro inserida com sucesso!', resultado);
		return resultado.insertId;
	}

	async getCategoriaLivroById(categoriaId: number): Promise<CategoriaLivro | null> {

		const rows = await executeQuery(
			'SELECT * FROM categoiriasLivro WHERE id = ?',
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

	}

    async getCategoriasLivro(): Promise<CategoriaLivro[] | null> {
        const rows = await executeQuery(
			'SELECT * FROM categoiriasLivro',
			[]
		);

		if (!rows || rows.length === 0) {
			return null;
		}

		return rows
    }
}

		/*
		public getListaCategoriasLivros(): CategoriaLivro[] {
				return this.listaCategoriasLivros;
		}

		public addCategoriaLivro(categoria: CategoriaLivro): void {
				this.listaCategoriasLivros.push(categoria);
		}

		public getCategoriaLivroById(id: number): CategoriaLivro | undefined {
				return this.listaCategoriasLivros.find(categoria => categoria.id === id);
		}
}
		*/