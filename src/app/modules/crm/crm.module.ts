import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule} from '@angular/material/card'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AgGridModule } from 'ag-grid-angular';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomerComponent } from './customer/customer.component';
import { ChartsModule } from 'ng2-charts';
import { MatTabsModule } from '@angular/material/tabs'; 


export const crmRoutes = [
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'contactllist',
    component: ContactlistComponent
  },
  {
    path:'customer',
    component: CustomerComponent
  }
];

@NgModule({
  declarations: [
    ContactsComponent,
    DashboardComponent,
    ContactlistComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    AgGridModule.withComponents(),
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,       
    MatNativeDateModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(crmRoutes),
    ChartsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [ContactsComponent]
})
export class CrmModule { }
