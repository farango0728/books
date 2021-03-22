import Customers  from '../../entities/customers';
import Login from '../../entities/login';
import Hapi from '@hapi/hapi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import Boom from '@hapi/boom';
import { Connection } from 'typeorm';

export const userLogIn = async (req: Hapi.request) => {
  try{
    const connection: Connection = req.server.app.connection;
    const { email, password } = req.payload;


    const [user, login] = await Promise.all([
      connection.manager.findOne(Customers, { where: { email, active: true  } }),
      connection.manager.findOne(Login, { where: { email}})
    ]);

    if (!user) throw Boom.badRequest('Usuario no existe');
    if (!login) throw Boom.badRequest('password no existe');

      
    const comp = bcrypt.compareSync(password, login.password);

    if (!comp) throw Boom.badRequest('Por favor valide sus crecenciales ingreos a la plataforma');

    const user1 = { 
      'username': login.idUser, 
      'role': 'admin' 
    }; 
    const token = jwt.sign(user1, '123456', { expiresIn: 300 }); 
    
    return { token};

  }catch (error) {
    console.log('userLogIn Error:', error);
    return error;
  }
};