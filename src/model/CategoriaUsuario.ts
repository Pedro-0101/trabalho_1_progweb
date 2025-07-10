import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuario {
    id: number;
    nome: string;

    private categoriaUsuarioRepository: CategoriaUsuarioRepository;

    constructor(id: number, nome: string) {

        this.id = id;
        this.nome = nome;
        
    }
}