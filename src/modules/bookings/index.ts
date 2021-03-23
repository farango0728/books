import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import {
  createReservation, 
  listReservation, 
  searchReservationBook, 
  searchReservationCustomer} from './controller';
import {Scopes} from '../user/types';

export = {
  name: 'Bookings',
  register: function (server: Hapi.Server, options: Options) : void {
    
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/bookings/reservation`,
      options: {
        description: 'Create reservation',
        notes: 'Description service',
        tags: ['api'],
        auth: {
          strategy: 'jwt',
          scope: [Scopes.CUSTOMER]
        },
      },
      handler: createReservation,
    });
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/bookings/listReservation`,
      options: {
        description: 'Create listReservation',
        notes: 'Description service',
        tags: ['api'],
        auth: {
          strategy: 'jwt',
          scope: [Scopes.CUSTOMER, Scopes.ADMIN]
        },
      },
      handler: listReservation,
    });
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/bookings/searchReservationBook`,
      options: {
        description: 'Create reservation',
        notes: 'Description service',
        tags: ['api'],
        validate: {
          query: Joi.object().keys({ 
            idBook: Joi.number().required(),
          })
        },
        auth: {
          strategy: 'jwt',
          scope: [Scopes.CUSTOMER, Scopes.ADMIN]
        },
      },
      handler: searchReservationBook,
    });
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/bookings/searchReservationCustomer`,
      options: {
        description: 'Create searchReservationCustomer',
        notes: 'Description service',
        tags: ['api'],
        validate: {
          query: Joi.object().keys({ 
            idCustomer: Joi.number().required(),
          })
        },
        auth: {
          strategy: 'jwt',
          scope: [Scopes.CUSTOMER, Scopes.ADMIN]
        },
      },
      handler: searchReservationCustomer,
    });
  },
};