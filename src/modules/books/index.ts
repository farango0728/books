import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import {createBooks, updateBook, listBooks} from './controller';
import {Scopes} from '../user/types';


export = {
  name: 'Books',
  register: function (server: Hapi.Server, options: Options) : void {
    
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/books/book`,
      options: {
        description: 'Create Book',
        notes: 'Description service',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({ 
            name: Joi.string().required(),
            autor: Joi.string().required(),
            category: Joi.string().required(),
            amount: Joi.number().required(),
            rate: Joi.number().required(),
          })
        },
        auth: {
          strategy: 'jwt',
          scope: [Scopes.ADMIN]
        },
      },
      handler: createBooks,
    });
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/books/updateBook`,
      options: {
        description: 'Create Book',
        notes: 'Description service',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({ 
            id: Joi.number().required(),
            name: Joi.string().optional(),
            autor: Joi.string().optional(),
            category: Joi.string().optional(),
            amount: Joi.number().optional(),
            rate: Joi.number().optional(),
          })
        },
        auth: {
          strategy: 'jwt',
          scope: [Scopes.ADMIN]
        },
      },
      handler: updateBook,
    });
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/books/listBook`,
      options: {
        description: 'Create listBook',
        notes: 'Description service',
        tags: ['api'],
        auth: {
          strategy: 'jwt',
          scope: [Scopes.ADMIN, Scopes.CUSTOMER]
        },
      },
      handler: listBooks,
    });
  },
};