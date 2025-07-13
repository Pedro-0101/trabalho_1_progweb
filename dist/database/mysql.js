"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeQuery = executeQuery;
const mysql2_1 = __importDefault(require("mysql2"));
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'biblioteca'
};
const mysqlConnection = mysql2_1.default.createConnection(dbConfig);
mysqlConnection.connect((err) => {
    if (err) {
        console.error("Erro ao se conectar com o banco de dados");
        throw err;
    }
    console.log('Conexao bem sucedida com o banco de dados');
});
function executeQuery(query, valores) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}
