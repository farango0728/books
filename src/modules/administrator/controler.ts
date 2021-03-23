import Administrator  from '../../entities/administrator';
import Customers from '../../entities/customers';
import Login from '../../entities/login';
import Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt'; 
import { sign } from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { Connection } from 'typeorm';
import config from '../../config';
import {Scopes} from '../../modules/user/types';


export const createAdministrator = async (req: Hapi.request)  => {
    
  try{
    const connection: Connection = req.server.app.connection;
    const {
      documentType, 
      documentNumber, 
      name, 
      lastName, 
      gender, 
      phone, 
      email 
    } = req.payload;
  
    const [existsDocumentAdministrator, existsEmailAdministrator, existsDocumentCustomers, existsEmailCustomers, ] = await Promise.all([
      connection.manager.findOne(Administrator, { where: { documentNumber}}),
      connection.manager.findOne(Administrator, { where: { email}}),
      connection.manager.findOne(Customers, { where: { documentNumber}}),
      connection.manager.findOne(Customers, { where: { email}})
    ]);
  
    if (existsDocumentAdministrator) throw Boom.badRequest('El documento ya existe Administrador');
    if (existsEmailAdministrator) throw Boom.badRequest('el email ya existe Administrador');
    if (existsDocumentCustomers) throw Boom.badRequest('El documento ya existe cliente');
    if (existsEmailCustomers) throw Boom.badRequest('el email ya existe cliente');
  
    const newCustomer = new Administrator();
  
    newCustomer.id = documentNumber;
    newCustomer.documentType = documentType; 
    newCustomer.documentNumber = documentNumber; 
    newCustomer.name = name; 
    newCustomer.lastName = lastName;
    newCustomer.gender = gender; 
    newCustomer.phone = phone;
    newCustomer.email = email;
  
    const newLogin = new Login();
  
    await connection.manager.transaction(async tManager => {       
      const customer = await tManager.save(newCustomer);
      const hash = bcrypt.hashSync(documentNumber,12);      
      newLogin.idUser = customer.id;
      newLogin.email = email;
      newLogin.password = hash;
      newLogin.scope = Scopes.ADMIN;
      await tManager.save(newLogin); 
            
    }); 
     
    return {
      user: newLogin,
      accessToken: sign({ ...newLogin }, config.token_secret.key),
    };
  
  
  }catch (error) {
    console.log('createAdministrator Error:', error);
    return error;
  }
};

export const listAdministrator = async (req: Hapi.request)  => {
    
  try{
    const connection: Connection = req.server.app.connection;
    return connection.manager.find(Administrator);
  }catch (error) {
    console.log('createAdministrator Error:', error);
    return error;
  }
};