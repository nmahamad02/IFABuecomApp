import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HrserviceServices } from 'src/app/service/hr/hr.service';

@Component({
  selector:  'app-leaveapp',
  templateUrl: './leaveapp.component.html',
  styleUrls: ['./leaveapp.component.scss']
})

export class LeaveappComponent implements OnInit {
  leaveAppnForm: FormGroup ;
  leaveCodeList: any[] = [];
  mempList: any[] =[];
  mEmpDetails: any = {
    EMPNAME: " ",
    JOIN_DT: " ",
    DIVISION_NAME: " ",
    DEPARTMENT_NAME: " ",
    DESIGNATION_NAME: " "
  }
  mBackupDetails: any;
  dashboardBool: boolean=true;
  applicationBool: boolean=false;
  attenbool: boolean = false;
  selectedValue: string = "";

  constructor(private hrservice: HrserviceServices) {
    this.leaveAppnForm = new FormGroup({
      empno: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
      emailid: new FormControl( '', [Validators.required ]),
      leaveappno: new FormControl('', [ Validators.required ]),
      efffrom: new FormControl('', [ Validators.required ]),
      leaveAppdt: new FormControl('', [ Validators.required ]),
      effuntil: new FormControl('', [ Validators.required ]),
      leavecd: new FormControl('', [ Validators.required ]),
      backupPlan: new FormControl('', [ Validators.required ]),
      remarks: new FormControl('', [ Validators.required ]),
    });
  }

  ngOnInit(): void {
  }

  toggleApplicationForm(){
    this.applicationBool = true;
    this.dashboardBool = false;
  }

  cancelApplicationForm(){
    this.applicationBool = false;
    this.dashboardBool = true;
  }


  searchEmp(empno:string, stype:string) {
    this.hrservice.getEmployeeDetails(empno).subscribe((res: any) => {
      console.log(res);
      if (stype==='empno'){
        this.mEmpDetails=res.recordset[0];
        console.log(this.mEmpDetails);
      }
      else if (stype==='backupPlan'){
        this.mBackupDetails=res.recordset[0];
        console.log(this.mBackupDetails);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  getLeaveTypes() {
    this.hrservice.getleaveType().subscribe((res: any) =>  {
      this.leaveCodeList=res.recordset;
    }, (error: any) => {
      console.log(error);
    });
  }

  leaveApplied() {
    this.attenbool = false;
  }

  getEmpshortList() {
    this.hrservice.getemplist().subscribe((res: any) =>  {
      this.mempList=res.recordset;
    }, (error: any) => {
      console.log(error);
    });
  }


}

