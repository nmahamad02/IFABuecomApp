import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LeaveappComponent } from './leaveapp/leaveapp.component';
import { MatTableModule } from '@angular/material/table';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeComponent } from './employee/employee.component';
// ag-grid

// material design
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


export const hrmsRoutes = [
  {
    path: 'dashboard',
    component: DashbaordComponent
  },
  {
    path: 'leaveapp',
    component: LeaveappComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  }
];


@NgModule({
  declarations: [
    DashbaordComponent,
    LeaveappComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    AgGridModule.withComponents(),
    ReactiveFormsModule,
    RouterModule.forChild(hrmsRoutes)
  ]
})
export class HrmsModule { }
