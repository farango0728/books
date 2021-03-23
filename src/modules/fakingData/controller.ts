import Books  from '../../entities/books';
import Bookings from '../../entities/bookings';
import Customers from '../../entities/customers'
import Administrator from '../../entities/administrator'
import Login from '../../entities/login'
import bcrypt from 'bcrypt';
import Hapi from '@hapi/hapi';
import { Connection } from 'typeorm';
import {DocumentType, Gender, Scopes} from '../../modules/user/types'


export const fakeBooks = async (req: Hapi.request) :  Promise<{'message' : string}>  => {
    
  try{
    const connection: Connection = req.server.app.connection;
    const admin = await connection.manager.count(Administrator);

    const newBook = new Books();
    const newCustomer = new Customers();
    const newAdministrator = new Administrator();
    const newLogin = new Login();
    const newLoginAdmin = new Login();
    const newReserved = new Bookings();

    let i = 0;
    console.log(admin);
    if(!admin){
        while (i < 1) {

            newCustomer.documentType = DocumentType.CC; 
            newCustomer.documentNumber = '123456789'; 
            newCustomer.name = 'Prueba cliente'; 
            newCustomer.lastName = 'Tita Media';
            newCustomer.gender = Gender.MALE;       
            newCustomer.department = 'Valle';
            newCustomer.city= 'Cali'; 
            newCustomer.neighborhood = 'Ciudad Jardin'; 
            newCustomer.address = 'Calle 12';
            newCustomer.phone = '0572534512';
            newCustomer.email = 'prueba@gmail.com';
            connection.manager.save(newCustomer);

            const hash = bcrypt.hashSync('123456789',12);      
            newLogin.idUser = 1;
            newLogin.email = 'prueba@gmail.com';
            newLogin.password = hash;
            newLogin.scope = Scopes.CUSTOMER;
            connection.manager.save(newLogin); 

            newAdministrator.id = 987654321;
            newAdministrator.documentType = DocumentType.CC; 
            newAdministrator.documentNumber = '987654321'; 
            newAdministrator.name = 'Prueba Administrador'; 
            newAdministrator.lastName = 'Tita Media';
            newAdministrator.gender = Gender.MALE;       
            newAdministrator.phone = '0572534512';
            newAdministrator.email = 'pruebaAdmin@gmail.com';
            connection.manager.save(newAdministrator);

            const hash1 = bcrypt.hashSync('987654321',12);      
            newLoginAdmin.idUser = 987654321;
            newLoginAdmin.email = 'pruebaAdmin@gmail.com';
            newLoginAdmin.password = hash1;
            newLoginAdmin.scope = Scopes.ADMIN;
            connection.manager.save(newLoginAdmin); 
            
            newBook.name = 'Don Quijote de la Mancha';
            newBook.autor = 'Miguel de Cervantes Saavedra';
            newBook.category = 'Parodia literaria';
            newBook.amount = 100;
            newBook.rate = 40000;
            connection.manager.save(newBook);

            newReserved.idBook = 1;
            newReserved.idCustomer = 1;
            newReserved.dateReturn = '2021-03-30';
            newReserved.amount = 2;
            newReserved.rate = 80000;
            connection.manager.save(newReserved);
            i++;
        }
    }
    return {'message' : 'La data inicial se carga a la base de datos el usario admin = pruebaAdmin@gmail.com y password = 987654321 --- usuario cliente = prueba@gmail.com y password = 123456789'}
  
  }catch (error) {
    console.log('createBooks Error:', error);
    return error;
  }
};