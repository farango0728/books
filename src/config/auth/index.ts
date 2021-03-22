
import { Connection } from 'typeorm';
import Hapi from '@hapi/hapi';
import Customers  from '../../entities/customers';
import Administrator from '../../entities/administrator'
import Login from '../../entities/login';
import bcrypt from 'bcrypt';
import administrator from '../../modules/administrator';

export const validate = async (req: Hapi.request, username : string, password : string) => {

  const connection: Connection = req.server.app.connection;    

  const [user, login, administrator] = await Promise.all([
    connection.manager.findOne(Customers, { where: { email : username, active: true  } }),
    connection.manager.findOne(Login, { where: { email : username}}),
    connection.manager.findOne(Administrator, { where: { email : username, active: true  } }),
  ]);
    
  if (!login) return { credentials: null, isValid: false };

  if(user){
    const isValid = await bcrypt.compare(password, login.password);
    const credentials = { id: user.id, name: user.name, scope : login.scope };
    return { isValid , credentials };
  }
  if(administrator){
    const isValid = await bcrypt.compare(password, login.password);
    const credentials = { id: administrator.id, name: administrator.name, scope : login.scope };
    return { isValid , credentials };
  }

  if (!user) return { credentials: null, isValid: false };
  if (!administrator) return { credentials: null, isValid: false };
  
};

export const validateJWT = async (req, request : Hapi.request) => {
  const connection: Connection = request.server.app.connection;
  const {id} = req;
    
  const [user, login, adminstrator] = await Promise.all([
    connection.manager.findOne(Customers, { where: { id , active: true  } }),
    connection.manager.findOne(Login, { where: { idUser : id}}),
    connection.manager.findOne(Administrator, { where: { id , active: true  } }),
  ]);
    
  
  if (!login) return { credentials: null, isValid: false };    
  
  if(user){
    const credentials = {id: user.id, name: user.name, scope : login.scope };
    return { isValid : true, credentials };
  }

  if(adminstrator){
    const credentials = {id: adminstrator.id, name: adminstrator.name, scope : login.scope };
    return { isValid : true, credentials };
  }

  if (!user)  return { credentials: null, isValid: false };
  if (!administrator)  return { credentials: null, isValid: false };
   
}; 



