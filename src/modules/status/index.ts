import Hapi from '@hapi/hapi';
import { getStatus } from './controller';
import { Options } from '../../config/types';

export = {
  name: 'Status',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/status`,
      options: {
        description: 'Get status service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getStatus,
    });
  },
};