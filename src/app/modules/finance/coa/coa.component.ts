import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from 'src/app/service/finance/finance.service';

export interface CoA {
  pcode: string;
  name: string;
}

let COA_DATA: CoA[] = [];

@Component({
  selector: 'app-coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss']
})
export class CoaComponent implements OnInit {

  displayedColumns: string[] = ['pcode', 'cust_name'];
  dataSource = new MatTableDataSource(COA_DATA);

  coaData: any[] = [];
  mainGrpData: any[] = [];
  subGrpData: any[] = [];
  glData: any[] = [];
  pcodeData: any[] = [];
  AccountCode: any[]=[];

  showSubGrp: boolean = false;
  showGL: boolean = false;
  showPcode: boolean = false;
  
  currentYear = new Date().getFullYear()

  constructor(private fnService: FinanceService) {
    console.log(String(this.currentYear));
  }

  ngOnInit(): void {
    this.getMainGrpData(String(this.currentYear));
  }

 

  getMainGrpData(year: string) {
    this.fnService.getMainGrp(year).subscribe((res: any) => {
      this.mainGrpData = res.recordset;
      this.showSubGrp = false;
      this.showGL = false;
      this.showPcode = false;
      console.log(this.mainGrpData);
    }, (err: any) => {
      console.log(err);
    })
  }

  getSubGrpData(maingrpcode: string) {
    this.fnService.getSubGrp(maingrpcode, String(this.currentYear)).subscribe((res: any) => {
      this.subGrpData = res.recordset;
      console.log(this.subGrpData);
      this.showSubGrp = true;
      this.showGL = false;
      this.showPcode = false;
    }, (err: any) => {
      console.log(err);
    })
  }

  getGlData(subgrpcode: string) {
    this.fnService.getGL(subgrpcode, String(this.currentYear)).subscribe((res: any) => {
      this.glData = res.recordset;
      this.showSubGrp = true;
      this.showGL = true;
      this.showPcode = false;
      console.log(this.glData);
    }, (err: any) => {
      console.log(err);
    })
  }
 
  getPcodeData(glcode: string) {
    this.fnService.getPcode(glcode, String(this.currentYear)).subscribe((res: any) => {
      this.pcodeData = res.recordset;
      this.showSubGrp = true;
      this.showGL = true;
      this.showPcode = true;
      this.dataSource = new MatTableDataSource(this.pcodeData);
      console.log(this.pcodeData);
    }, (err: any) => {
      console.log(err);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
