import { Environments } from './types';
import dotenv from 'dotenv';

dotenv.config();

export default {
  server: {
    environment: process.env.NODE_ENV || Environments.DEV,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9000,
    corsOrigins: process.env.corsOrigins || 'http://localhost:9000'
  },
  project: {
    name: process.env.NAME || 'Tita Media Books API',
  },
  database: {
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PWD || '',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false || true,
    logging: process.env.DB_ENABLE_LOGGING === 'true' ? true : false || false,
    entitiesPath: process.env.NODE_ENV === Environments.PROD ? './entities/*.js' : './entities/*.ts',
    migrationsPath: process.env.NODE_ENV === Environments.PROD ? './migrations/*.js' : './migrations/*.ts',
  },
  token_secret:{
    key: process.env.TOKEN_SECRET || '1234567890',
  },
};
