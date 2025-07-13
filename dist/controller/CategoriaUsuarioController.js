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
exports.CategoriaUsuarioController = void 0;
const tsoa_1 = require("tsoa");
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const CategoriaUsuarioDto_1 = require("../model/dto/CategoriaUsuarioDto");
let CategoriaUsuarioController = class CategoriaUsuarioController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.categoriaUsuarioService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    }
    listarCategoriasUsuario(fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoriasUsuario = yield this.categoriaUsuarioService.getCategoriasUsuario();
                return success(200, new BasicResponseDto_1.BasicResponseDto('Lista de categorias de usuarios', categoriasUsuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    addCategoriaUsuario(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novaCategoriaUsuario = yield this.categoriaUsuarioService.criarCategoriaUsuario(dto.nome);
                return success(201, new BasicResponseDto_1.BasicResponseDto('Categoria criada com sucesso', novaCategoriaUsuario));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.CategoriaUsuarioController = CategoriaUsuarioController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "listarCategoriasUsuario", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaUsuarioDto_1.CategoriaUsuarioDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "addCategoriaUsuario", null);
exports.CategoriaUsuarioController = CategoriaUsuarioController = __decorate([
    (0, tsoa_1.Route)('categoriaUsuario'),
    (0, tsoa_1.Tags)('CategoriaUsuario')
], CategoriaUsuarioController);
