import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import {SharedProp} from './sharedProp.helpers';
import { ColumnNumericTransformer } from '../utils/db';
import Login from './login';
import {DocumentType, Gender} from '../modules/user/types';
  
@Entity()
export default class Administrator extends SharedProp{
        
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