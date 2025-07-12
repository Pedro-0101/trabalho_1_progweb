import { textUtils } from "../utils/textUtil";

export class CategoriaUsuario {
    id: number | null;
    nome: string;

    constructor(nome: string) {

        if (!nome || nome.trim() === "") {
            throw new Error("O nome da categoria não pode ser vazio.");
        }

        nome = textUtils.capitalizarTexto(nome);

        this.id = null;
        this.nome = nome;
        
    }
}