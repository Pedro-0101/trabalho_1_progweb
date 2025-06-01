import { LivroRepository } from "../repository/LivroRepository";
import { Estoque } from "./Estoque";

export class Livro {
    id: number;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    isbn: string;
    categoria_id: number;

    constructor(titulo: string, autor: string, editora: string, edicao: string, isbn: string, categoria_id: number) {

        let instance = LivroRepository.getInstance();       // Cria uma instância do repositório de livros
        this.id = instance.getListaLivros().length + 1;     // Atribui um ID único baseado no tamanho da lista de livros
        this.titulo = titulo;                               // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.autor = autor;                                 // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.editora = editora;                             // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.edicao = edicao;                               // Espera receber uma string não vazia maior que 3 caracteres (service)
        this.isbn = isbn;                                   // Espera receber uma string não vazia no formato correto (service)
        this.categoria_id = categoria_id;                   // Validar se a categoria existe no sistema (service)

        instance.addLivro(this);                            // Adiciona o livro à lista de livros
        //const estoque = new Estoque(this.id);               // Cria um novo estoque para o livro

    }
}