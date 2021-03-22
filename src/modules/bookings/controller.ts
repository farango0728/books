import Bookings  from '../../entities/bookings';
import Books from '../../entities/books';
import Customer from '../../entities/customers';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Connection } from 'typeorm';


export const createReservation = async (req: Hapi.request) : Promise <Bookings>  => {
    
  try{
    const connection: Connection = req.server.app.connection;
    const {
      idBook,
      amount,
      dateReturn
    } = req.payload;

    const uid = req.auth.credentials.id;

    const data = await connection.manager
      .createQueryBuilder()
      .select('SUM(b.amount)', 'sum')
      .from(Bookings, 'b')
      .where('b.idBook = :idBook AND active = :active', {idBook : idBook, active: 1})
      .getRawOne(); 

    const{sum} = data;
  
    const [book] = await Promise.all([
      connection.manager.findOne(Books, { where: { id: idBook,  active : 1}})
    ]);
  
    if (!book) throw Boom.badRequest('El libro no existe');
    if(amount < 0) throw Boom.badRequest('La cantidad debe ser positiva');
    if(!amount) throw Boom.badRequest('La cantidad debe ser mayor de cero');

    if(sum != null){
      if(book.amount < (parseInt(sum) + amount)){
        const available = book.amount  - (parseInt(sum));
        throw Boom.badRequest(`Cantidad disponible de libros es : ${available}`);
      }
    }

    if(sum == null){ 
      if( book.amount < amount){
        throw Boom.badRequest(`La cantidad disponible del libro es ${book.amount}`);
      }
    }
  
    const newReserved = new Bookings();

    newReserved.idBook = idBook;
    newReserved.idCustomer = uid;
    newReserved.dateReturn = dateReturn;
    newReserved.amount = amount;
    newReserved.rate = book.rate * amount;

    return   connection.manager.save(newReserved);
  
  }catch (error) {
    console.log('createBooks Error:', error);
    return error;
  }
};

export const listReservation = async (req: Hapi.request) : Promise <Books>  => {
  
  try{
    const connection: Connection = req.server.app.connection;
    const data = await connection.manager
      .createQueryBuilder()
      .select(['d.id as id', 'b.name as name', 'b.autor as autor', 'b.category as category', 'b.amount as amountInventory', 'bk.dateReturn as dateReturn', 'bk.amount as amountReserved', 'bk.rate as rate', 'c.name as nameCustomer', 'c.lastName as lastNameCustomer', 'c.email as email', 'c.city as city', 'c.phone as phone'])
      .from(Books, 'b')
      .innerJoin(Bookings, 'bk')
      .innerJoin(Customer, 'c')
      .where('bk.active = :active', { active: 1})
      .getRawOne(); 

    return  data;

  }catch (error) {
    console.log('createBooks Error:', error);
    return error;
  }
};

export const searchReservationBook = async (req: Hapi.request) : Promise <Books>  => {
  
  try{
    const connection: Connection = req.server.app.connection;
    const {idBook} = req.query;
    const data = await connection.manager
      .createQueryBuilder()
      .select(['b.id as id', 'b.name as name', 'b.autor as autor', 'b.category as category', 'b.amount as amountInventory', 'bk.dateReturn as dateReturn', 'bk.amount as amountReserved', 'bk.rate as rate', 'c.name as nameCustomer', 'c.lastName as lastNameCustomer', 'c.email as email', 'c.city as city', 'c.phone as phone'])
      .from(Books, 'b')
      .innerJoin(Bookings, 'bk')
      .innerJoin(Customer, 'c')
      .where('bk.active = :active AND bk.idBook = :idBook', { active: 1, idBook : idBook })
      .getRawOne(); 

    if(!data) throw Boom.badRequest('El libro no tiene reservaciones activas');

    return  data;

  }catch (error) {
    console.log('createBooks Error:', error);
    return error;
  }
};

export const searchReservationCustomer = async (req: Hapi.request) : Promise <Books>  => {
  
  try{
    const connection: Connection = req.server.app.connection;
    const {idCustomer} = req.query;
    const data = await connection.manager
      .createQueryBuilder()
      .select(['b.id as id', 'b.name as name', 'b.autor as autor', 'b.category as category', 'b.amount as amountInventory', 'bk.dateReturn as dateReturn', 'bk.amount as amountReserved', 'bk.rate as rate', 'c.name as nameCustomer', 'c.lastName as lastNameCustomer', 'c.email as email', 'c.city as city', 'c.phone as phone'])
      .from(Books, 'b')
      .innerJoin(Bookings, 'bk')
      .innerJoin(Customer, 'c')
      .where('bk.active = :active AND bk.idCustomer = :id', { active: 1, id : idCustomer})
      .getRawOne(); 

    if(!data) throw Boom.badRequest('El cliente no tiene reservaciones activas');

    return  data;

  }catch (error) {
    console.log('createBooks Error:', error);
    return error;
  }
};

