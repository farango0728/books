import Hapi from '@hapi/hapi';
import { getStatus } from './controller';

export = {
  name: 'Status',
  register: function (server: Hapi.Server): void {
    server.route({
      method: 'GET',
      path: '/status',
      options: {
        description: 'Get status service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: getStatus,
    });
  },
};