import * as mysqlDriver from 'mysql2';
import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from 'dotenv';
import { User } from '../entities/User';

dotenv.config();

export const AppDataSource = new DataSource({
    driver: mysqlDriver,
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT || "3306"),
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME,
        synchronize: false,
        migrationsTableName:"migration_table",
        // migrations:["src/migration/*.ts"],
        entities: [User]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to db")
    })
    .catch((error) => console.log(error))