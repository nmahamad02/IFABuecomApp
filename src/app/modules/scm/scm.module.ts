import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors/vendors.component';
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
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

export const scmRoutes = [
  {
    path: 'vendor',
    component: VendorsComponent
  }
]

@NgModule({
  declarations: [
      VendorsComponent
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
    RouterModule.forChild(scmRoutes),
    ChartsModule
  ]
})
export class ScmModule { }
