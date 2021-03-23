import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Books from './books';
import Customers from './customers';
    
  @Entity()
export default class Bookings extends SharedProp{
          
          @PrimaryGeneratedColumn()
          id: number;
      
          /** The customers name */
          @Column()
          idCustomer: number;
  
          /** The customers autor */
          @Column()
          idBook: number;  
          
          /** The customers autor */
          @Column()
          dateReturn: string;  

          /** The customers autor */
          @Column()
          amount: number;  

          /** The customers autor */
          @Column()
          rate: number;  
      
          /** The customers active */
          @Column({ default: true })
          active: boolean 

          /** Relation to Customers */
        @ManyToOne(() => Customers, customer => customer.id)
        Customers: Customers;

          /** Relation to Books */
        @ManyToOne(() => Books, books => books.id)
        Books: Books; 
    
}