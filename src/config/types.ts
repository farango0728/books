import { ServerApplicationState } from '@hapi/hapi';
import { Connection } from 'typeorm';

export enum Environments {
	DEV = 'DEV',
	QA = 'QA',
	PROD = 'PROD',
}

export interface ModuleSettings {
	routePrefix?: string;
}

export interface DatabaseConfig {
	host: string;
	port: number;
	name: string;
	username: string;
	password: string;
	synchronize: boolean;
	logging: boolean;
	entitiesPath: string;
	migrationsPath: string;
}

export interface ApplicationState extends ServerApplicationState {
	connection: Connection;
}

export interface Options {
	routePrefix: string;
}