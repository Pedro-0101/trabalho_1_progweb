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