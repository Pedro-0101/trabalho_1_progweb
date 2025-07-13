"use strict";
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
exports.EmprestimoRepository = void 0;
const mysql_1 = require("../database/mysql");
class EmprestimoRepository {
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        CREATE TABLE IF NOT EXISTS emprestimos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            estoque_id INT NOT NULL,
            data_emprestimo DATETIME NOT NULL,
            data_devolucao DATETIME NOT NULL,
            data_entrega DATETIME NULL,
            dias_atraso INT NULL,
            suspensao_ate DATETIME NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
            FOREIGN KEY (estoque_id) REFERENCES estoques(id)
        )`;
            try {
                const resultado = yield (0, mysql_1.executeQuery)(query, []);
                console.log('Tabela emprestimos criada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Erro ao criar tabela emprestimos', err);
            }
        });
    }
    insertEmprestimo(emprestimo) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield (0, mysql_1.executeQuery)(`INSERT INTO emprestimos 
            (usuario_id, estoque_id, data_emprestimo, data_devolucao, data_entrega, dias_atraso, suspensao_ate) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                emprestimo.usuarioId,
                emprestimo.estoqueId,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.dataEntrega,
                emprestimo.diasAtraso,
                emprestimo.suspensaoAte
            ]);
            console.log('Empréstimo inserido com sucesso!', resultado);
            return resultado.insertId;
        });
    }
    emprestimosEmAberto(usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const rows = yield (0, mysql_1.executeQuery)(`SELECT COUNT(*) AS total FROM emprestimos WHERE usuario_id = ? AND data_entrega IS NULL`, [usuarioId]);
            return (_b = (_a = rows[0]) === null || _a === void 0 ? void 0 : _a.total) !== null && _b !== void 0 ? _b : 0;
        });
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
/*
    public getListaEmprestimos(): Emprestimo[] {
        return this.listaEmprestimos;
    }

    public addEmprestimo(emprestimo: Emprestimo): void {
        this.listaEmprestimos.push(emprestimo);
    }

    public getEmprestimoById(id: number): Emprestimo | undefined {
        return this.listaEmprestimos.find(emprestimo => emprestimo.id === id);
    }

    public emprestimosEmAberto(usuarioId: number): number {
        return this.listaEmprestimos.filter(emprestimo => emprestimo.usuarioId === usuarioId && !emprestimo.dataDevolucao).length;
    }

    public qtdeEmprestada(estoqueId: number): number{

        return this.getListaEmprestimos().filter( e => !e.dataDevolucao && e.estoqueId === estoqueId).length;

    }

}*/ 
