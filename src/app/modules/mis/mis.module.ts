import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialsComponent } from './financials/financials.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export const misRoutes = [
  {
    path: 'financials',
    component: FinancialsComponent
  }
  ];

@NgModule({
  declarations:  [
    FinancialsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(misRoutes)
  ]
})
export class MisModule { }


