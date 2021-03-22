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

    newCustomer.documentType = documentType; 
    newCustomer.documentNumber = documentNumber; 
    newCustomer.name = name; 
    newCustomer.lastName = lastName;
    newCustomer.gender = gender;       
    newCustomer.department = department;
    newCustomer.city= city; 
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
      accessToken: sign({ ...newLogin }, config.token_secret.key),
    };


  }catch (error) {
    console.log('createCustomer Error:', error);
    return error;
  }
};

export const updateCustomer = async (req: Hapi.request) : Promise<Customers> => {
  try{

    const connection: Connection = req.server.app.connection;
    const uid = req.auth.credentials.id;

    return connection.manager.transaction(async tManager => {
      
      const {
        documentType, 
        documentNumber, 
        name, 
        lastName, 
        gender, 
        department, 
        city, 
        neighborhood, 
        address, 
        phone, 
        email, 
        active
      } = req.payload;

      const [user, existsDocument, existsEmail] = await Promise.all([
        tManager.findOne(Customers, { where: { id : uid}}),
        tManager.findOne(Customers, { where: { documentNumber}}),
        tManager.findOne(Customers, { where: { email}})
      ]);

      if (!user) throw Boom.badRequest('El usuario no existe');
      if (existsDocument) throw Boom.badRequest('El documento ya existe');
      if (existsEmail) throw Boom.badRequest('el email ya existe');

      user.documentType = documentType ? documentType : user.documentType; 
      user.documentNumber = documentNumber ? documentNumber : user.documentNumber;
      user.name = name ? name : user.name;
      user.lastName = lastName ? lastName : user.lastName;
      user.gender = gender ? gender : user.gender;       
      user.department = department ? department : user.department;
      user.city= city? city : user.city; 
      user.neighborhood = neighborhood ? neighborhood : user.neighborhood; 
      user.address = address ? address : user.address;
      user.phone = phone ? phone : user.phone;
      user.email = email ? email : user.email;
      user.active = active ? active : user.active;
      console.log(active);

      await tManager.save(user);

      const [login] = await Promise.all([
        tManager.findOne(Login, { where: { idUser : uid}})
      ]);

      if (!login) throw Boom.badRequest('El usuario no existe');
      login.email = email ? email : login.email;

      await tManager.save(login);

      return user
    });
    
  }catch (error) {
    console.log('getAllCustomers Error:', error);
    return error;
  }
};