import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse} from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioDTO } from "../model/dto/UsuarioDto";

@Route('usuario')
@Tags('Usuario')

export class UsuarioController extends Controller{

    UsuarioService = new UsuarioService();
    
    @Get()
    async listarUsuarios(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise< | void> {
        try {
            const usuarios = await this.UsuarioService.getUsuarios();
            return success(200, new BasicResponseDto('Lista de usuarios', usuarios));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get('{cpf}')
    async getUsuarioByCpf(
        @Path() cpf: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise< | void> {
        try {
            const usuario = await this.UsuarioService.getUsuarioByCpf(cpf);
            return success(200, new BasicResponseDto('Detalhes do usuario', usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Post()
    async addUsuario(
        @Body() dto: UsuarioDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise< | void> {
        try {
            const novoUsuario = await this.UsuarioService.criarUsuario(dto.nome, dto.cpf, dto.ativo, dto.categoriaId, dto.cursoId);
            return success(201, new BasicResponseDto('Usuario criado com sucesso', novoUsuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}