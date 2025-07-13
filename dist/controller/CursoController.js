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
exports.CursoController = void 0;
const tsoa_1 = require("tsoa");
const CursoService_1 = require("../service/CursoService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const CursoDto_1 = require("../model/dto/CursoDto");
let CursoController = class CursoController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.CursoService = new CursoService_1.CursoService();
    }
    listarCursos(fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cursos = yield this.CursoService.getCursos();
                return success(200, new BasicResponseDto_1.BasicResponseDto('Lista cursos', cursos));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
    addCurso(dto, fail, success) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novoCurso = yield this.CursoService.criarCurso(dto.nome);
                return success(201, new BasicResponseDto_1.BasicResponseDto('Curso criado com sucesso', novoCurso));
            }
            catch (error) {
                return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
            }
        });
    }
};
exports.CursoController = CursoController;
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "listarCursos", null);
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CursoDto_1.CursoDTO, Function, Function]),
    __metadata("design:returntype", Promise)
], CursoController.prototype, "addCurso", null);
exports.CursoController = CursoController = __decorate([
    (0, tsoa_1.Route)('curso'),
    (0, tsoa_1.Tags)('Curso')
], CursoController);
