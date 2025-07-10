import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";

export class CategoriaLivro {
    id: number;
    nome: string;

    private CategoriaLivroRepository: CategoriaLivroRepository;

    constructor(id: number, nome: string) {
        
        this.id = id;
        this.nome = nome;
        
    }
}