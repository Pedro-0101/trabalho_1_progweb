export class CategoriaUsuario {
    id: number;
    nome: string;

    constructor(id: number, nome: string) {

        this.id = id;                                               // Atribui o ID da categoria, validacao realizada no service
        this.nome = nome;                                           // Atribui o nome da categoria, validacao realizada no service
        
    }
}