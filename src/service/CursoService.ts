import { Curso } from "../model/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    private cursoRepository: CursoRepository;

    constructor() {
        this.cursoRepository = CursoRepository.getInstance();
    }

    public criarCurso(nome: string, descricao: string): Curso {
        // Valida o nome do curso
        if (!nome || nome.trim() === "" || nome.length < 3) {
            throw new Error("O nome do curso deve ter mais de 3 caracteres válidos.");
        }

        // Remove espaços em branco extras e capitaliza a primeira letra
        nome = nome.trim();
        nome = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

        // Verifica se o curso já existe
        let cursoExistente = this.cursoRepository.getListaCursos().find(curso => curso.nome === nome);
        if (cursoExistente) {
            throw new Error("Curso já existe.");
        }

        // Cria um novo curso com um ID único
        let id = this.cursoRepository.getListaCursos().length + 1;
        let curso = new Curso(id, nome);

        // Verifica se o curso foi criado corretamente
        if (!curso) {
            throw new Error("Erro ao criar o curso.");
        }

        // Adiciona o curso ao repositório
        this.cursoRepository.addCurso(curso);

        // Retorna o curso criado
        return curso;
    }
}