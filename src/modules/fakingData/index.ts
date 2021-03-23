import Hapi from '@hapi/hapi';
import { fakeBd } from './controller';
import { Options } from '../../config/types';

export = {
  name: 'Fake',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/fake/db`,
      options: {
        description: 'Get status service',
        notes: 'Service to obtain the health of the project',
        tags: ['api']
      },
      handler: fakeBd,
    });
  },
};