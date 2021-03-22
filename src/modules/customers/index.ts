import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getAllCustomers, createCustomer } from './controller';
import { CustomersDocumentType, CustomersGender } from '../../entities/customers';
import {Scopes} from '../user/types';


export = {
  name: 'Customers',
  register: function (server: Hapi.Server, options: Options) : void {
    server.route({
      method: 'GET',
      path: `${options.routePrefix}/customers/customer`,
      options: {
        description: 'Get all active customer',
        notes: 'Description service',
        tags: ['api'],
        auth: {
          strategy: 'jwt',
          scope: [Scopes.CUSTOMER]
        },
      },
      handler: getAllCustomers
    });

    server.route({
      method: 'POST',
      path: `${options.routePrefix}/customers/customer`,
      options: {
        description: 'Create customer',
        notes: 'Description service',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            documentType: Joi.string().valid(...Object.values(CustomersDocumentType)).required(), 
            documentNumber: Joi.string().required(),
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().valid(...Object.values(CustomersGender)).required(),
            department: Joi.string().required(),
            city: Joi.string().required(),
            neighborhood: Joi.string().required(),
            address: Joi.string().required(),
            phone: Joi.number().min(1111111111).max(9999999999).strict(true),
            email: Joi.string().email().required()
          })
        },
        auth: false,
      },
      handler: createCustomer,
    });
  },
};