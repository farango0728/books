import config from './config';
const { database } = config;

export = {
  type: 'mysql',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
  entities: [database.entitiesPath],
  migrations: [database.migrationsPath],
  synchronize: database.synchronize,
  logging: database.logging,
  cli: {
    entitiesDir: './entities',
    migrationsDir: './migrations',
  },
};
