import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse, Query } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoService } from "../service/EmprestimoService";
import { EmprestimoDTO } from "../model/dto/EmprestimoDto";

@Route('emprestimo')
@Tags('Emprestimo')
export class EmprestimoController extends Controller {

    estoqueService = new EmprestimoService();

    @Get()
	async listarEmprestimos(
		@Res() fail: TsoaResponse<400, BasicResponseDto>,
		@Res() success: TsoaResponse<200, BasicResponseDto>,
		@Query() ativos: boolean,
		@Query() estoqueId?: number
	): Promise<void> {
		try {
			const listaEmprestimo = await this.estoqueService.getListaEmprestimos(ativos, estoqueId);
			return success(200, new BasicResponseDto('Lista de emprestimos', listaEmprestimo));
		} catch (error: any) {
			return fail(400, new BasicResponseDto(error.message, undefined));
		}
	}

    @Post()
    async addEmprestimo(
        @Body() dto: EmprestimoDTO,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise< | void> {
        try {
            const novoEmprestimo = await this.estoqueService.registrarEmprestimo(dto.cpf, dto.codigoExemplar);
            return success(201, new BasicResponseDto('Exemplar inserido com sucesso', novoEmprestimo));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

}