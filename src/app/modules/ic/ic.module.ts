import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { StockissueComponent } from './stockissue/stockissue.component';
import { SiReportComponent } from './si-report/si-report.component';
import { ActiveReportsModule } from '@grapecity/activereports-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar'

export const  icRoutes = [
  {
    path : 'products',
    component: ProductsComponent
  },
  {
    path : 'stock-issue',
    component: StockissueComponent
  },
  {
    path : 'stock-issue-voucher',
    component: SiReportComponent
  }
]
@NgModule({
  declarations: [
    ProductsComponent,
    StockissueComponent,
    SiReportComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatIconModule,
    AgGridModule.withComponents(),
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,       
    MatNativeDateModule,
    FormsModule,
    ActiveReportsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(icRoutes),
    ChartsModule
  ]
})
export class IcModule { 

}
