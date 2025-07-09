import { rejects } from 'assert';
import mysql, { Connection, QueryError } from 'mysql2';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'biblioteca'
}

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if(err){
        console.error("Erro ao se conectar com o banco de dados");
        throw err;
    }
    console.log('Conexao bem sucedida com o banco de dados');
})

export function executeQuery(query: string, valores: any[]): Promise<any>{

    return new Promise ((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if(err){
                console.error('Erro ao executar a query', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}