import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Customers from './customers';
import Administrator from './administrator';
import {Scopes} from '../modules/user/types';
  

    @Entity()
export default class Login extends SharedProp{
        
        @PrimaryColumn()
        idUser: number;

        /** The customers document number */
        @Column({ unique: true })
        email: string;

        /** The customers document number */
        @Column({ unique: true })
        password: string;

        /** The customers document type */
        @Column({ type: 'enum', enum: Scopes, default: Scopes.CUSTOMER })
        scope: Scopes;

        /** Relation to Customers */
        @ManyToOne(() => Customers, customer => customer.id)
        Customer: Customers;

        /** Relation to Administrator */
        @ManyToOne(() => Administrator, administrator => administrator.id)
        Administrator: Administrator; 
        
}