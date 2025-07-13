"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EmprestimoService_1 = require("../service/EmprestimoService");
const EmprestimoDto_1 = require("../model/dto/EmprestimoDto");
let EmprestimoController = class EmprestimoController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.emprestimoService = new EmprestimoService_1.EmprestimoService();
    }
    listarEmprestimos(fail, success, ativos, estoqueId, usuaioId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listaEmprestimo = yield this.emprestimoService.getListaEmprestimos(ativos, estoqueId, usuaioId);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Lista de emprestimos', listaEmprestimo));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    addEmprestimo(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoEmprestimo = yield this.emprestimoService.registrarEmprestimo(dto.cpf, dto.codigoExemplar);
                return success(201, new BasicResponseDto_1.BasicResponseDto('Exemplar inserido com sucesso', novoEmprestimo));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    registrarDevolucao(id, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emprestimoAtualizado = yield this.emprestimoService.registrarDevolucao(id);
                return success(200, new BasicResponseDto_1.BasicResponseDto('Devolucao registrada com sucesso.', emprestimoAtualizado));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function, Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "listarEmprestimos", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoDto_1.EmprestimoDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "addEmprestimo", null);
__decorate([
    (0, tsoa_1.Put)('devolucao/{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "registrarDevolucao", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)('emprestimo'),
    (0, tsoa_1.Tags)('Emprestimo')
], EmprestimoController);
