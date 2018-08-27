import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from './customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private dbPath = '/customers';
   customersRef: AngularFireList<Customer> = null;
   constructor(private db: AngularFireDatabase) {
     this.customersRef = db.list(this.dbPath);
   }
   createCustomer(customer: Customer): void {
     this.customersRef.push(customer);
   }
   updateCustomer(key: string, value: any): void {
     this.customersRef.update(key, value).catch(error => this.handleError(error));
   }
   deleteCustomer(key: string): void {
     this.customersRef.remove(key).catch(error => this.handleError(error));
   }
   getCustomersList(): AngularFireList<Customer> {
     return this.customersRef;
   }
   deleteAll(): void {
     this.customersRef.remove().catch(error => this.handleError(error));
   }
   private handleError(error) {
     console.log(error);
   }
}
