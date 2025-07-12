import { Emprestimo } from "../model/Emprestimo";
import { executeQuery } from "../database/mysql";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;

    private constructor() {
            this.createTable();
        }
    
        public static getInstance(): EmprestimoRepository {
            if (!this.instance) {
                this.instance = new EmprestimoRepository();
            }
            return this.instance;
        }
    
        private async createTable(){
            const query = `CREATE TABLE IF NOT EXISTS emprestimo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id VARCHAR(255) NOT NULL
            )`;
            try{
                const resultado = await executeQuery(query, []);
                console.log('Tabela categoriaUsuario criada com sucesso: ', resultado);
            }catch(err){
                console.error('Erro ao criar tabela categoriaUsuario', err);
            }
        }
    
        async insertCategoriaUsuario(nome: string): Promise<Emprestimo>{
            const resultado = await executeQuery(
                'INSERT INTO categoriaUsuario(nome) VALUES (?)', 
                [nome]
            );
            console.log('Emprestimo inserido com sucesso!', resultado);
            return new Emprestimo(resultado.insertId, nome);
        }

    public getListaEmprestimos(): Emprestimo[] {
        return this.listaEmprestimos;
    }

    public addEmprestimo(emprestimo: Emprestimo): void {
        this.listaEmprestimos.push(emprestimo);
    }

    public getEmprestimoById(id: number): Emprestimo | undefined {
        return this.listaEmprestimos.find(emprestimo => emprestimo.id === id);
    }

    public emprestimosEmAberto(usuarioId: number): number {
        return this.listaEmprestimos.filter(emprestimo => emprestimo.usuarioId === usuarioId && !emprestimo.dataDevolucao).length;
    }

    public qtdeEmprestada(estoqueId: number): number{

        return this.getListaEmprestimos().filter( e => !e.dataDevolucao && e.estoqueId === estoqueId).length;

    }

}