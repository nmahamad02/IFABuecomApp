import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { HrserviceServices } from 'src/app/service/hr/hr.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  gridOptions!: Partial<GridOptions>;
  emplist: any[] = [];
  columnDefs:any;
  gridApi: any;
  params: any;
  gridColumnApi:any;
  sortingOrder:any;
  rowStyle: { background: string; };
  cacheOverflowSize: any;
  searchValue: any;

  constructor(private hrservice : HrserviceServices) { 
    this.columnDefs = [
      { 
        headername: "EMPNO",checkboxSelection: true ,
        field: "EMPNO",
        width: 75
      },
      { 
        headername: "EMP NAME", sortable: true,  
        field: "EMPNAME",
        width: 250
      },
      { 
        headername: "DESIGNATION",
        field: "DESIGNATION_NAME",
        width:250
       },
       { 
        headername: "NATIONALITY",sortable: true,
        field: "NATIONALITY",
        width:250
       },
       { 
        headername: "DEPARTMENT NAME",sortable: true,
        field: "DEPARTMENT_NAME",
        width:250
       },
       { 
        headername: "JOIN DATE",
        field: "JOIN_DT",
        width:150
       },
       {
        headername: "CONTRACTOR_NAME",sortable: true,
        field: "CONTRACTOR_NAME",
        width:250
       }
    ];

    this.cacheOverflowSize =2;
    this.rowStyle = { background: 'rag-amber' };
  
    this.gridOptions = {
      headerHeight: 45,
      rowHeight: 30,
      cacheBlockSize: 90,
      rowStyle : { background: 'rag-green' },
      paginationPageSize: 90
    }
  }
    
  onGridempReady(params: any){ 
    this.gridApi= params.api;
    this.gridColumnApi= params.columnApi;
    this.hrservice.getemplist().subscribe((res: any) =>  {
      this.emplist=res.recordset;
      params.api.setRowData(this.emplist);
      console.log(this.emplist);
    }, (error: any) => {
      console.log(error);
    });
  }
    
  quickempSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
    
  ngOnInit(): void {}

}
