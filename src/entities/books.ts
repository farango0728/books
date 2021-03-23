import { Boom } from '@hapi/boom';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Bookings from './bookings';
    
  @Entity()
export default class Books extends SharedProp{
          
          @PrimaryGeneratedColumn()
          id: number;
      
          /** The customers name */
          @Column()
          name: string;
  
          /** The customers autor */
          @Column()
          autor: string;  
          
          /** The customers autor */
          @Column()
          category: string;  

          /** The customers autor */
          @Column()
          amount: number;  

          /** The customers autor */
          @Column()
          rate: number;  
      
          /** The customers active */
          @Column({ default: true })
          active: boolean 

          /** Relation to Reservation */ 
        @OneToMany(() => Bookings, bookings => bookings.id)
        Bookings: Bookings[];
    
}