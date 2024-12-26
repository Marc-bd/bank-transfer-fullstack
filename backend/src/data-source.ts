import {DataSource} from "typeorm";

export const AppDataSource = new DataSource(
    {
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: true,
        entities: [

            __dirname + '/entities/*.ts',
        ],
        migrations: [

        ],
        subscribers: [

        ],
    }
);