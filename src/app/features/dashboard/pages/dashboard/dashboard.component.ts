import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../../shared/services/customers.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe({
      next: (data) => {
        console.log('Customers:', data);
      },
      error: (error) => {
        console.error('Error fetching customers:', error);
      }
    });
  }
}
