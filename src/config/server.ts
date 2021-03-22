import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import config from '.';

export default function initializeServer(): Hapi.Server {
  const { host, port, corsOrigins } = config.server;
  const server = Hapi.server({
    host: host,
    port: port,
    routes: {
      cors: {
        origin: corsOrigins?.replace(/ /g, '').split(',') || [`${host}:${port}`],
      },
    },
  });
  
  server.validator(Joi);
  return server;
}