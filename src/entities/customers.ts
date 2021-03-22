import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import { ColumnNumericTransformer } from '../utils/db';
import Login from './login';
  
/** Available values for a client gender */
export enum CustomersGender {
        MALE = 'Masculino',
        FEMALE = 'Femenino',
        OTHER = 'Otro',
    }

/** Available values for a client document type */
export enum CustomersDocumentType {
        TI = 'Tarjeta de identidad',
        CC = 'Cédula de ciudadanía',
        CE = 'Cédula de extranjería',
    }

    @Entity()
export default class Customers extends SharedProp{
        
        @PrimaryGeneratedColumn()
        id: number;

        /** The customers document type */
        @Column({ type: 'enum', enum: CustomersDocumentType, default: CustomersDocumentType.CC })
        documentType: CustomersDocumentType;

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
        @Column({ type: 'enum', enum: CustomersGender, default: CustomersGender.OTHER })
        gender: CustomersGender;
        
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

        /** Relation to Login */ 
        @ManyToOne(() => Login, login => login.idUser)
        login: Login[];
  
}