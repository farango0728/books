import Books  from '../../entities/books';
import Bookings from '../../entities/bookings'
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { Connection } from 'typeorm';


export const createBooks = async (req: Hapi.request) : Promise <Books>  => {
    
    try{
      const connection: Connection = req.server.app.connection;
      const {
          name, 
          autor, 
          category, 
          amount, 
          rate 
      } = req.payload;
  
      const [existeBook] = await Promise.all([
        connection.manager.findOne(Books, { where: { autor, name}})
      ]);
  
      if (existeBook) throw Boom.badRequest('El libro ya existe');
  
      const newBook = new Books();
  
      newBook.name = name; 
      newBook.autor = autor;
      newBook.category = category; 
      newBook.amount = amount;
      newBook.rate = rate;
      return   connection.manager.save(newBook)
  
    }catch (error) {
      console.log('createBooks Error:', error);
      return error;
    }
  };

  export const updateBook = async (req: Hapi.request) : Promise <Books>  => {
    
    try{
      const connection: Connection = req.server.app.connection;
      const {
          id,
          name, 
          autor, 
          category, 
          amount, 
          rate 
      } = req.payload;
  
      const [book, existeBook] = await Promise.all([
        connection.manager.findOne(Books, { where: { id}}),
        connection.manager.count(Books, { where: { name, autor}})
      ]);
     
      if (!book) throw Boom.badRequest('El libro no existe con ese Id'); 
      if (existeBook) throw Boom.badRequest('El libro ya existe'); 
  
      book.name = name ? name : book.name; 
      book.autor = autor ? autor : book.autor; 
      book.category = category ? category : book.category; 
      book.amount = amount ? amount : book.amount; 
      book.rate = rate ? rate : book.rate; 
      return  connection.manager.save(book)
  
    }catch (error) {
      console.log('createBooks Error:', error);
      return error;
    }
  };

  export const listBooks = async (req: Hapi.request) : Promise <Books>  => {
    
    try{
      const connection: Connection = req.server.app.connection;
      const data = await connection.manager
      .createQueryBuilder()
      .select(['b.name as name', 'b.autor as autor', 'b.category as category', 'b.amount as amount'])
      .addSelect("SUM(bk.amount)", "reserved")
      .from(Books, 'b')
      .innerJoin(Bookings, 'bk')
      .where("bk.active = :active", { active: 1})
      .groupBy("b.id")
      .getRawOne(); 

      return  data
  
    }catch (error) {
      console.log('createBooks Error:', error);
      return error;
    }
  };