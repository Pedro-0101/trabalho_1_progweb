import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse} from "tsoa";
import { CursoService } from "../service/CursoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CursoDTO } from "../model/dto/CursoDto";

@Route('curso')
@Tags('Curso')

export class CursoController extends Controller{

    CursoService = new CursoService();
    
    @Get()
    async listarCursos(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise< | void> {
        try {
            const cursos = await this.CursoService.getCursos();
            return success(200, new BasicResponseDto('Lista cursos', cursos));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Post()
    async addCurso(
        @Body() dto: CursoDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise< | void> {
        try {
            const novoCurso = await this.CursoService.criarCurso(dto.nome);
            return success(201, new BasicResponseDto('Curso criado com sucesso', novoCurso));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}