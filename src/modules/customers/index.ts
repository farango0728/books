import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import { getAllCustomers, createCustomer, updateCustomer } from './controller';
import { DocumentType, Gender} from '../user/types';
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
          scope: [Scopes.CUSTOMER, Scopes.ADMIN]
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
            documentType: Joi.string().valid(...Object.values(DocumentType)).required(), 
            documentNumber: Joi.string().required(),
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            gender: Joi.string().valid(...Object.values(Gender)).required(),
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
    server.route({
      method: 'PUT',
      path: `${options.routePrefix}/customers/updateCustomer`,
      options: {
        description: 'Create customer',
        notes: 'Description service',
        tags: ['api'],
        validate: {
          payload: Joi.object().keys({
            documentType: Joi.string().valid(...Object.values(DocumentType)).optional(), 
            documentNumber: Joi.string().optional(),
            name: Joi.string().optional(),
            lastName: Joi.string().optional(),
            gender: Joi.string().valid(...Object.values(Gender)).optional(),
            department: Joi.string().optional(),
            city: Joi.string().optional(),
            neighborhood: Joi.string().optional(),
            address: Joi.string().optional(),
            phone: Joi.number().min(1111111111).max(9999999999).strict(true).optional(),
            email: Joi.string().email().optional(),
            active: Joi.boolean().optional()
          })
        },
        auth: {
          strategy: 'jwt',
          scope: [Scopes.CUSTOMER]
        },
      },
      handler: updateCustomer,
    });
  },
};