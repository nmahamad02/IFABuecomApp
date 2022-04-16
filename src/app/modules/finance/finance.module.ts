import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoaComponent } from './coa/coa.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTreeModule } from '@angular/material/tree';
import { FinanceService } from 'src/app/service/finance/finance.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

export const financeRoutes = [
  {
    path: 'coa',
    component: CoaComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  }
];


@NgModule({
  declarations: [
    CoaComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    RouterModule.forChild(financeRoutes)
  ],
  providers: [
    FinanceService
  ]
})
export class FinanceModule { }
