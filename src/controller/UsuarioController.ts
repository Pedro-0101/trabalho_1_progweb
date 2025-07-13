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
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Query() categoriaId?: number,
        @Query() cursoId?: number
    ): Promise< | void> {
        try {
            const usuarios = await this.UsuarioService.getUsuarios(categoriaId, cursoId);
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
    } // <-- Add this closing brace for addUsuario

    @Put('{cpf}')
    async atualizarUsuario(
        @Path() cpf: string,
        @Body() dto: UsuarioDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarioAtualizado = await this.UsuarioService.atualizarUsuario(
                dto.nome,
                cpf,
                dto.ativo,
                dto.categoriaId,
                dto.cursoId
            );
            return success(200, new BasicResponseDto('Usuario atualizado com sucesso', usuarioAtualizado));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete('{cpf}')
    async deletarUsuario(
        @Path() cpf: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            await this.UsuarioService.deletarUsuario(cpf);
            return success(200, new BasicResponseDto('Usuario deletado com sucesso com sucesso', undefined));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}