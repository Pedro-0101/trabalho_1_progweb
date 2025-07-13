import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse} from "tsoa";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaUsuarioDTO } from "../model/dto/CategoriaUsuarioDto";

@Route('categoriaUsuario')
@Tags('CategoriaUsuario')

export class CategoriaUsuarioController extends Controller{

    categoriaUsuarioService = new CategoriaUsuarioService();
    
    @Get()
    async listarCategoriasUsuario(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise< | void> {
        try {
            const categoriasUsuario = await this.categoriaUsuarioService.getCategoriasUsuario();
            return success(200, new BasicResponseDto('Lista de categorias de usuarios', categoriasUsuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Post()
    async addCategoriaUsuario(
        @Body() dto: CategoriaUsuarioDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise< | void> {
        try {
            const novaCategoriaUsuario = await this.categoriaUsuarioService.criarCategoriaUsuario(dto.nome);
            return success(201, new BasicResponseDto('Categoria criada com sucesso', novaCategoriaUsuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}