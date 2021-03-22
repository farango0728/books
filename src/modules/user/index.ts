import Hapi from '@hapi/hapi';
import { Options } from '../../config/types';
import { sign } from 'jsonwebtoken';

export = {
  name: 'User',
  register: function (server: Hapi.Server, options: Options): void {
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/user/logIn`,
      async handler({ auth :{credentials}})  {
        console.log(credentials);
        return {...credentials, accesToken: sign({...credentials}, 'getMeFromEnvFile')};
      },
      options: {
        description: 'User log in',
        notes: 'Description service',
        tags: ['api'],
        auth: {
          strategy: 'simple',
        },
      },
    });
  },
};