
import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Customers  from '../../entities/customers';
import Login from '../../entities/login';
import bcrypt from 'bcrypt';

export const validate = async (req: Hapi.request, username : string, password : string) => {

  const connection: Connection = req.server.app.connection;    

  const [user, login] = await Promise.all([
    connection.manager.findOne(Customers, { where: { email : username, active: true  } }),
    connection.manager.findOne(Login, { where: { email : username}})
  ]);
    

  if (!user)  return { credentials: null, isValid: false };
  if (!login) return { credentials: null, isValid: false };

  const isValid = await bcrypt.compare(password, login.password);
  const credentials = { id: user.id, name: user.name, scope : login.scope };
  
  return { isValid , credentials };
};

export const validateJWT = async (req, request : Hapi.request) => {
  const connection: Connection = request.server.app.connection;
  const {id} = req;
    
  const [user, login] = await Promise.all([
    connection.manager.findOne(Customers, { where: { id , active: true  } }),
    connection.manager.findOne(Login, { where: { idUser : id}})
  ]);
    
  if (!user)  return { credentials: null, isValid: false };
  if (!login) return { credentials: null, isValid: false };
    
    
  const credentials = {id: user.id, name: user.name, scope : login.scope };
  return { isValid : true, credentials };
   
}; 



