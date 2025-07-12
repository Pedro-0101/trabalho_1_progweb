import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { EmprestimoService } from "./EmprestimoService";
import { EstoqueService } from "./EstoqueService";

export class LivroService {
    private livroRepository: LivroRepository;

    constructor() {
        this.livroRepository = LivroRepository.getInstance();
    }

    async criarLivro(
        titulo: string,
        autor: string,
        editora: string,
        edicao: string,
        isbn: string,
        categoriaId: number
    ): Promise<Livro> {
        // Instância temporária só para validação e formatação
        const livroTemp = new Livro(titulo, autor, editora, edicao, isbn, categoriaId);

        // Persiste e obtém o ID gerado
        const id = await this.livroRepository.insertLivro(livroTemp);

        // Retorna nova instância com ID preenchido
        return new Livro(titulo, autor, editora, edicao, isbn, categoriaId, id);
    }

    async getLivroByIsbn(isbn: string): Promise<Livro> {
        const livro = await this.livroRepository.getLivroByIsbn(isbn);

        if (!livro) {
            throw new Error(`Livro com ISBN ${isbn} não encontrado.`);
        }

        return livro;
    }

    async getLivroById(livroId: number): Promise<Livro | null> {

        if(!livroId){
            throw new Error('Id do livro invalido!');
        }

        return this.livroRepository.getLivroById(livroId);

    }

    /*public ListarLivrosFiltro(filtroAutor: string, filtroEditora: string, filtroCategoria: number): Livro[] | null{

        try{
            
            let listaLivros: Livro[];
            listaLivros = this.livroRepository.getListaLivros();

            if(filtroAutor){
                listaLivros.filter(livro => {livro.autor === filtroAutor});
            }

            if(filtroEditora){
                listaLivros.filter(livro => {livro.editora === filtroEditora});
            }

            if(filtroCategoria){
                listaLivros.filter(livro => {livro.categoriaId === filtroCategoria});
            }

            return listaLivros;

        }catch(error){
            throw new Error('Erro ao listar livros com filtro');
        }

    }

    public detalhesLivro(isbn: string): Livro | null{
        try{

            if(!isbn){
                throw new Error("Erro ao requisitar detalhes do livro: ISBN invalido: "+isbn);
            }

            const livro = this.livroRepository.getLivroByIsbn(isbn);
            return livro;

        }catch(error){
            throw new Error("Erro ao requisitar detalhes do livro")
        }

    }

    public atualizarLivro(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoriaId: number): Livro | null{

        try{

            const livroAtualizado = this.livroRepository.atualizarLivro(titulo, autor, editora, edicao, isbn, categoriaId);
            return livroAtualizado;
            
        }catch(error){
            throw new Error("Erro ao atualizar informacoes do livro")
        }
    }

    public deletarLivro(isbn: string): void{

        try{

            const emprestimoService = new EmprestimoService();
            const estoqueService = new EstoqueService();
            const estoqueId = estoqueService.getEstoqueId(null, isbn);
            let qtdeEmprestada = emprestimoService.qtdeEmprestada(estoqueId);

            if(qtdeEmprestada === 0){

            estoqueService.deletarEstoque(estoqueId);
            this.livroRepository.deletarLivro(isbn);
                
            }else{
                throw new Error("Erro ao deletar livro, possui empresimos em andamento");
            }

        }catch(error){
            throw new Error("Erro ao deletar livro");
        }

    }
*/
}