import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { FinanceService } from 'src/app/service/finance/finance.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  public supForm: FormGroup; 
  currentYear = new Date().getFullYear()
  searchValue: any;
  gridOptions!: Partial<GridOptions>;
  supplierList: any[] = [];
  supPartyList: any[] = [];
  supInvoiceList: any[] = [];
  AccountsCategoryList: any[] = [];
  AccountsTypeList: any[] = [];
  gridApi: any;
  gridColumnApi:any;
  gridApiCust: any;
  gridColumnApiCust:any;
  columnSupplierDefs:any;
  columnContactDefs:any;
  columnSupplieropeningDefs:any;

  rowStyle!: { background: string; };
  sortingOrder:any;
  mAccountDetails: any = {
    Cust_name: "",
    mOpbal: 0,
    mDebit: 0,
    mCredit: 0
  }

  varName: string = "";
  varAccountCategory: any ;
  varAccountType: string = "";
  varBranch: string = "";
  varAccountGroup: string = "";
  varAccountGroupName: string="";
  varexcode:string ="";
  varcreditPeriod: string ="";
  varActive:string = "";
  varLimit:string = "";
  varCrCpr:string = "";
  varTaxNo: string = "";
  varselected: string = "";
  varpcode:string = "";
  varsfyear:string ="2021-01-01";
  varefyear:string ="2021-01-01";

  opbalChartBool: boolean = false;
  varInvChartLabels: any[] = [];
  varInvChartValues: any[] = [];


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = this.varInvChartLabels;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: this.varInvChartValues, label: 'Ageing' },
  ];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(2, 46, 82)' }
  ];

  constructor(private financeservice:FinanceService) { 
    this.supForm = new FormGroup({
      cname: new FormControl('', [ Validators.required]),
      cAccountCategory: new FormControl('', [ Validators.required]),
      cAccountGroup: new FormControl('', [ Validators.required]),
      CAccountGroupName: new FormControl('', [ Validators.required]),
      cType: new FormControl('', [ Validators.required]),
      cBranch: new FormControl('', [ Validators.required]),
      cExternalCode: new FormControl('', [ Validators.required]),
      cCreditPeriod: new FormControl('', [ Validators.required]),
      cLimit: new FormControl('', [ Validators.required]),
      cCR: new FormControl('', [ Validators.required]),
      cActive: new FormControl('', [ Validators.required]),
      cTaxNo: new FormControl('', [ Validators.required])
    });
    this.columnSupplierDefs = [
      { 
        headername: "Customer ID",
        sortable: true,
        field: "PCODE",
        width: 85
      },
      { 
        headerName: "NAME", 
        field: 'CUST_NAME', 
        width:250, 
        suppressMenu: false, 
        unSortIcon: true,
        sortable: true,
        tooltipField: "NAME", 
        headerTooltip: "NAME" 
      },
      { 
        headername: "TYPE",
        field: "TYPE",
        filter: true,
        rowGroup:true,
        enableRowGroup: true,
        width:75
      },
      { 
        headername: "ADDRESS I",
        filter: true,
        sortable: true,
        field: "ADD1",
        width:150
      },
      { 
        headername: "ADDRESS II",
        filter: true,
        sortable: true,
        field: "ADD2",
        width:150
      },
      { 
        headername: "MOBILE",
        filter: true,
        field: "MOBILE",
        width:100
      },
      { 
        headername: "EMAIL",
        filter: true,
        field: "EMAIL_ID",
        width:200
      }
    ];

    this.columnSupplieropeningDefs = [
      { 
        headername: "INVOICE",
        sortable: true ,
        field: "INV_NO", rowGroup: true,
        width: 150
      },
      { 
        headerName: "DESCRIPTION", 
        field: 'DESCRIPTION', 
        width:450, 
        suppressMenu: false, 
        unSortIcon: true,
        sortable: true, 
        tooltipField: "DESCRIPTION", 
        headerTooltip: "DESCRIPTION" 
      },
      { 
      //  headername: "INVOICE AMOUNT",
       // field: "INV_AMOUNT",
       /// filter: true,
        //rowGroup:true,
        //enableRowGroup: true,
        //width:100
        
          headername: "INVOICE AMOUNT",
          filter: true,
          field: "INV_AMOUNT",
          cellRenderer: (params:any) => {
            var usdFormate = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'BHD',
              minimumFractionDigits: 3
            });
            return usdFormate.format(params.value);
          },
          width:200
             
      },
      { 
        headername: "INV_DATE",
        cellRenderer: (data: any) => {
          return moment(data.createdAt).format('DD/MM/YYYY')
        },
        filter: true,sortable: true,
        field: "INV_DATE",
        width:100
      },
      { 
        headername: "REFNO",
        filter: true,
        sortable: true,
        field: "REFNO",
        width:150
      },
      { 
        headername: "REFDATE",
        filter: true,
        field: "REFDT",
        cellRenderer: (data: any) => {
          return moment(data.createdAt).format('DD/MM/YYYY')
        },
        width:100
      },
      { 
        headername: "REF_AMOUNT",
        filter: true,
        field: "REFAMOUNT",
        cellRenderer: (params:any) => {
          var usdFormate = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BHD',
            minimumFractionDigits: 3
          });
          return usdFormate.format(params.value);
        },
        width:200
      }
    ];
    
    this.columnContactDefs = [
      { 
        headername: "Party ID",
        sortable: true ,
        field: "PARTY_ID",
        width: 85
      },
      { 
        headerName: "NAME", 
        field: 'NAME', 
        width:250, 
        suppressMenu: false, 
        unSortIcon: true,
        sortable: true,
        tooltipField: "NAME", 
        headerTooltip: "NAME" 
      },
      { 
        headername: "TYPE",
        field: "TYPE",
        filter: true,
        rowGroup:true,
        enableRowGroup: true,
        width:75
      },
      { 
        headername: "ADDRESS I",
        filter: true,
        sortable: true,
        field: "ADD1",
        width:150
      },
      { 
        headername: "ADDRESS II",
        filter: true,
        sortable: true,
        field: "ADD2",
        width:150
      },
      { 
        headername: "MOBILE",
        filter: true,
        field: "MOBILE",
        width:100
      },
      { 
        headername: "EMAIL",
        filter: true,
        field: "EMAIL_ID",
        width:200
      }
    ];
  }
  onGridSupplierReady(params: any){ 
    this.gridApi= params.api;
    this.gridColumnApi= params.columnApi;
    this.financeservice.getSupplierList(String(this.currentYear)).subscribe((res: any) =>  {
      console.log(this.supplierList);
      this.supplierList=res.recordset;
      params.api.setRowData(this.supplierList);
      console.log(this.supplierList);
    }, (error: any) => {
      console.log(error);
    });
  }

  onGridSupplierParty(params: any){ 
    this.gridApiCust= params.api;
    this.gridColumnApiCust= params.columnApi;
    this.financeservice.getCustomerParty(this.varpcode).subscribe((res: any) => {
      this.supPartyList = res.recordset;
      console.log(this.supPartyList);
      params.api.setRowData(this.supPartyList);
    }, (err: any) => {
      console.log(err);
    })
  }

  onGridSupplierOpeningDetail(params: any){ 
    this.gridApiCust= params.api;
    this.gridColumnApiCust= params.columnApi;
    this.financeservice.getCustomerInvoices(this.varpcode, this.varsfyear, this.varefyear).subscribe((res: any) => {
      this.supInvoiceList = res.recordset;
      console.log(this.supInvoiceList);
      params.api.setRowData(this.supInvoiceList);
     for(let i=0; i<this.supInvoiceList.length; i++) {
      var tempChartLbl: string = this.supInvoiceList[i].INV_NO;
      var tempChartVal: number = this.supInvoiceList[i].INV_AMOUNT;
      this.varInvChartLabels.push(tempChartLbl);
      this.varInvChartValues.push(tempChartVal);
     }
      console.log(this.varInvChartLabels);
      console.log(this.varInvChartValues);
    }, (err: any) => {
      console.log(err);
    })
  }


  onViewCellClicked(event: any){
    console.log(event.data);
    if (event.column.colId =="CUST_NAME" ){
     this.varName = event.data.CUST_NAME;
     this.varAccountCategory= event.data.ACCOUNT_CATEGORY_DESC;
     this.varBranch= event.data.BRANCH_NAME;
     this.varAccountType = event.data.ACCOUNT_TYPE_CD;
     this.varAccountGroup = event.data.GLCODE;
     this.varcreditPeriod = event.data.CREDITPERIOD;
     this.varAccountGroupName = event.data.GLNAME;
     this.varLimit = event.data.CR_LIMIT;
     this.varCrCpr = event.data.CR_CPR;
     this.varTaxNo = event.data.TAX_1_NO;
     this.varpcode = event.data.PCODE;
     this.getSupplierParty(this.varpcode);
     this.getSupplierInvoices(this.varpcode,this.varsfyear,this.varefyear);
    }
  }

  quickSupplierSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  getSupplierParty(pcode:string) {
    this.financeservice.getCustomerParty(pcode).subscribe((res: any) => {
      this.supPartyList = res.recordset;
      console.log(this.supPartyList);
    }, (err: any) => {
      console.log(err);
    })
  }

  
  getAccountsCategoryData() {
    this.financeservice.getAccountsCategory().subscribe((res: any) =>  {
      this.AccountsCategoryList=res.recordset;
      console.log(this.AccountsCategoryList);
    }, (error: any) => {
      console.log(error);
    });
  }

  getAccountsTypeData() {
    this.financeservice.getAccountsType().subscribe((res: any) =>  {
      this.AccountsTypeList=res.recordset;
      console.log(this.AccountsTypeList);
    }, (error: any) => {
      console.log(error);
    }); 
  }
  
  getSupplierInvoices(pcode: string,sfyear: string,efyear: string) {
    this.financeservice.getCustomerInvoices(pcode, sfyear,efyear).subscribe((res: any) => {
      this.supInvoiceList = res.recordset;
      console.log(this.supInvoiceList);
      this.supInvoiceList = [];
       this.varInvChartValues = [];
      for(let i=0; i<this.supInvoiceList.length; i++) {
      var tempChartLbl: string = this.supInvoiceList[i].INV_NO;
      var tempChartVal: number = this.supInvoiceList[i].INV_AMOUNT;
      this.varInvChartLabels.push(tempChartLbl);
      this.varInvChartValues.push(tempChartVal);
      }
      console.log(this.varInvChartLabels);
      console.log(this.varInvChartValues);
    }, (err: any) => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.getAccountsCategoryData();
    this.getAccountsTypeData();
  }
  
  flipChartGrid() {
    this.opbalChartBool = !this.opbalChartBool;
  }


}