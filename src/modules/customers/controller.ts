import Customers  from '../../entities/customers';
import Login from '../../entities/login';
import Hapi from '@hapi/hapi';
import bcrypt from 'bcrypt'; 
import { sign } from 'jsonwebtoken';
import Boom from '@hapi/boom';
import { Connection } from 'typeorm';
import config from '../../config';

export const getAllCustomers = async (req: Hapi.request) => {
  try{
    const connection: Connection = req.server.app.connection;
    return connection.manager.find(Customers, { where: { active: true }, order: { name: 'ASC' } });
  }catch (error) {
    console.log('getAllCustomers Error:', error);
    return error;
  }
};

export const createCustomer = async (req: Hapi.request)  => {
    
  try{
    const connection: Connection = req.server.app.connection;
    const {documentType, documentNumber, name, lastName, gender, department, city, neighborhood, address, phone, email 
    } = req.payload;

    const [existsDocument, existsEmail] = await Promise.all([
      connection.manager.findOne(Customers, { where: { documentNumber}}),
      connection.manager.findOne(Customers, { where: { email}})
    ]);

    if (existsDocument) throw Boom.badRequest('El documento ya existe');
    if (existsEmail) throw Boom.badRequest('el email ya existe');

    const newCustomer = new Customers();

    newCustomer.name = name;
    newCustomer.documentType = documentType; 
    newCustomer.documentNumber = documentNumber; 
    newCustomer.name = name; 
    newCustomer.lastName = lastName;
    newCustomer.gender = gender;       
    newCustomer.department = department;
    newCustomer.city= city, 
    newCustomer.neighborhood = neighborhood; 
    newCustomer.address = address;
    newCustomer.phone = phone;
    newCustomer.email = email;

    const newLogin = new Login();

    await connection.manager.transaction(async tManager => {       
      const customer = await tManager.save(newCustomer);
      const hash = bcrypt.hashSync(documentNumber,12);      
      newLogin.idUser = customer.id;
      newLogin.email = email;
      newLogin.password = hash;
      await tManager.save(newLogin); 
          
    }); 

    return {
      user: newLogin,
      accessToken: sign({ ...newLogin }, config.token_secret),
    };


  }catch (error) {
    console.log('createCustomer Error:', error);
    return error;
  }
};

  