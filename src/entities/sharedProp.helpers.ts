import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export class SharedProp {
 @CreateDateColumn({
   type: 'datetime',
   name: 'created_at'
 })
 createdAt: Date;

 @UpdateDateColumn({
   type: 'datetime',
   name: 'updated_at'
 })
 updatedAt: Date;
}