import Hapi from '@hapi/hapi';
import { ApplicationState } from '../types';
import { createConnection } from 'typeorm';
import { DatabaseConfig } from '../types';

export default class Database {
	private config: DatabaseConfig;

	constructor(config: DatabaseConfig) {
	  this.config = config;
	}

	async connect(server: Hapi.server): Promise<void> {
	  try {
	    const connection = await createConnection({
	      type: 'mysql',
	      host: this.config.host,
	      port: this.config.port,
	      username: this.config.username,
	      password: this.config.password,
	      database: this.config.name,
	      entities: [this.config.entitiesPath],
	      synchronize: this.config.synchronize,
	      logging: this.config.logging,
	    });

	    (<ApplicationState>server.app).connection = connection;
	  } catch (err) {
	    console.error('Database error:', err);
	  }
	}
}