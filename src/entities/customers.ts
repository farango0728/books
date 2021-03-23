import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import { ColumnNumericTransformer } from '../utils/db';
import Login from './login';
import {DocumentType, Gender} from '../modules/user/types';
import Bookings from './bookings'
@Entity()
export default class Customers extends SharedProp{
        
        @PrimaryGeneratedColumn()
        id: number;

        /** The customers document type */
        @Column({ type: 'enum', enum: DocumentType, default: DocumentType.CC })
        documentType: DocumentType;

        /** The customers document number */
        @Column({ unique: true })
        documentNumber: string;
    
        /** The customers name */
        @Column()
        name: string;

        /** The customers lastname */
        @Column()
        lastName: string;

        /** The customers gender */
        @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
        gender: Gender;
        
        /** The customers department */
        @Column()
        department: string; 

        /** The customers city */
        @Column()
        city: string; 

        /** The customers neighborhood */
        @Column()
        neighborhood: string;

        /** The customers address */
        @Column()
        address: string;

        /** The customers phone */
        @Column('bigint', { transformer: new ColumnNumericTransformer() })
        phone: string;

        /** The customers email */
        @Column({ unique: true })
        email: string;         
    
        /** The customers active */
        @Column({ default: true })
        active: boolean 

         /** Relation to Bookings */ 
         @OneToMany(() => Bookings, bookings => bookings.idCustomer)
         Bookings: Bookings[];

        /** Relation to Login */ 
        @OneToMany(() => Login, login => login.idUser)
        login: Login[];
  
}