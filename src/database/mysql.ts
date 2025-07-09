import mysql, { Connection, QueryError } from 'mysql2';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'localhostDB'
}

const mysqlConnection: Connection = mysql.createConnection(dbConfig);