import { Curso } from "../model/Curso";
import { CursoRepository } from "../repository/CursoRepository";

export class CursoService {
    private cursoRepository: CursoRepository;

    constructor() {
        this.cursoRepository = CursoRepository.getInstance();
    }

    public criarCurso(nome: string): Curso {
        
        let curso = new Curso(nome);

        // Verifica se o curso foi criado corretamente
        if (!curso) {
            throw new Error("Erro ao criar o curso.");
        }

        // Adiciona o curso ao repositório
        this.cursoRepository.addCurso(curso);

        // Retorna o curso criado
        return curso;
    }

    public listarCursos(): Curso[] {
        // Retorna a lista de cursos
        return this.cursoRepository.getListaCursos();
    }

}