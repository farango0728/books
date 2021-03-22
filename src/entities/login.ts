import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import Customers from './customers';
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
        @OneToMany(() => Customers, customer => customer.id)
        Customer: Customers;
        
}