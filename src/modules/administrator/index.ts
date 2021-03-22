import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import { Options } from '../../config/types';
import {createAdministrator } from './controler';
import { DocumentType, Gender} from '../user/types';
import {Scopes} from '../user/types';


export = {
  name: 'Administrator',
  register: function (server: Hapi.Server, options: Options) : void {
    
    server.route({
      method: 'POST',
      path: `${options.routePrefix}/adminstrator/adminstrator`,
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
            phone: Joi.number().min(1111111111).max(9999999999).strict(true),
            email: Joi.string().email().required()
          })
        },
        auth: {
          strategy: 'jwt',
          scope: [Scopes.ADMIN]
        },
      },
      handler: createAdministrator,
    });
  },
};