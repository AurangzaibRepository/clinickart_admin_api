import 'dotenv/config';
import { DataSource } from "typeorm";

export const AppDataSource =  new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    synchronize: false,

    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts']
});