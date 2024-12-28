import {DataSource} from "typeorm";
import {Transfer} from "./entities/transfer.entity";

export const AppDataSource = new DataSource(
    {
        type: 'postgres',
        host: 'postgres_db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        synchronize: true,
        logging: true,
        entities: [Transfer],
    }
);
