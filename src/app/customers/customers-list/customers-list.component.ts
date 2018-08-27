import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {
  customers: any;
   constructor(private customerService: CustomerService) { }
  ngOnInit() {
  this.getCustomersList();
  }
  getCustomersList() {
    // Use snapshotChanges().map() to store the key
    this.customerService.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(customers => {
      this.customers = customers;
    });
  }
  deleteCustomers() {
    this.customerService.deleteAll();
  }
}
