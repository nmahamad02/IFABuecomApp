import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HrserviceServices } from 'src/app/service/hr/hr.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { FinanceService } from 'src/app/service/finance/finance.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  currentYear = new Date().getFullYear()

  public profileForm: FormGroup;
  searchValue: any;
  gridOptions!: Partial<GridOptions>;
  partylist: any[] = [];
  columnDefs:any;
  gridApi: any;
  params: any;
  gridColumnApi:any;
  rowStyle: { background: string; };
  sortingOrder:any;
  mAccountDetails: any = {
    Cust_name: "",
    mOpbal: 0,
    mDebit: 0,
    mCredit: 0
  }
  cacheOverflowSize: any;
  dashboardBool: boolean=true;
  contactsBool: boolean=false;
  varPobox: String = "";
  varFax1: String = "";
  varFax2: String = "";
  varPhone1: String = "";
  varPhone2: String = "";
  varName: string = "";
  varMobile: string = "";
  varPcode: string = "";
  varPname: string = "";
  varEmailId: string = "";
  varAddress1: string = "";
  varAddress2: string = "";
  varAddress3: string = "";
  varFlatnbr: string = "";
  varBuilding: string = "";
  varRoadnbr: string = "";
  varBlocknbr: string = "";
  varHousenbr: String = "";
  varCity: String = "";
  varPartyId: string = "";
  varIs_Primary: any ;
  varSelected: string = "";
  varCreatedt:any;
  AccountCode: any;
  varGlname:string="";
  
  
  constructor(private financeservice: FinanceService) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [ Validators.required]),
      mobilenbr: new FormControl('', [ Validators.required]),
      emailId: new FormControl('', [ Validators.required, Validators.email]),
      pcode: new FormControl('', [ Validators.required]),
      pname: new FormControl('', [ Validators.required]),
      address1: new FormControl(''),
      address2: new FormControl(''),
      address3: new FormControl(''),
      isPrimary: new FormControl(''),
      dateOfRegistration: new FormControl(''),
      pobox: new FormControl('',  [ Validators.required]),
      fax1: new FormControl(''),
      fax2: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
      flatnbr: new FormControl('', [ Validators.required]),
      roadnbr: new FormControl('', [ Validators.required]),
      blocknbr: new FormControl('', [ Validators.required]),
      housenbr: new FormControl('', [ Validators.required]),
      area: new FormControl('', [ Validators.required]),
    });

    this.columnDefs = [
      { 
        headername: "Patry ID",sortable: true ,
        field: "PARTY_ID",
        width: 85
      },
      { 
        headerName: "NAME", field: 'NAME', width:250, suppressMenu: false, unSortIcon: true,sortable: true, cellRenderer(params: { value: string; }) {
          // below line is just to create empty without any action hyperlink
          // to trick the user, but actual action happen onViewCellCliced() // function
          console.log(params.value);
          return '<a>' + params.value + '</a>';
        },
        tooltipField: "NAME", headerTooltip: "NAME" 
      },
      { 
        headername: "TYPE",
        field: "TYPE",filter: true,
        rowGroup:true,
        enableRowGroup: true,
        width:75
      },
      { 
        headername: "ADDRESS I",filter: true,sortable: true,
        field: "ADD1",
        width:150
      },
      { 
        headername: "ADDRESS II",filter: true,sortable: true,
        field: "ADD2",
        width:150
      },
      { 
        headername: "MOBILE",filter: true,
        field: "MOBILE",
        width:100
      },
      { 
        headername: "EMAIL",filter: true,
        field: "EMAIL_ID",
        width:200
      },
      { 
        headername: "FLAT",filter: true,
        field: "FLAT",
        width:75
      },
      {
        headername: "BUILDING",sortable: true,
        field: "BUILDING",
        width:100
      },
      { 
        headername: "STREET",filter: true,
        field: "STREET",
        width:100
      },
       {
        headername: "BLOCK",sortable: true,
        field: "BLOCK",
        width:100
      },
      {
        headername: "CITY",sortable: true,
        field: "CITY",
        width:150
      }
    ];

    this.cacheOverflowSize =2;
    this.rowStyle = { background: 'rag-amber' };
  
    this.gridOptions = {
      defaultColDef : {
        sortable: true
      },
      columnDefs: this.columnDefs,
      groupUseEntireRow: true,
      defaultGroupSortComparator: function(nodeA, nodeB) {
        if (nodeA.key < nodeB.key) {
          return -1;
        } else if (nodeA.key > nodeB.key) {
          return 1;
        } else {
          return 0;
        }
      },
      headerHeight: 45,
      rowHeight: 30,
      suppressPropertyNamesCheck: true,      
      cacheBlockSize: 90,
      rowStyle : { background: 'rag-green' },
      paginationPageSize: 90
    }
  }

  ngOnInit(): void {
  }
    
  onGridPartyReady(params: any){ 
    this.gridApi= params.api;
    this.gridColumnApi= params.columnApi;
    this.financeservice.getAllParty().subscribe((res: any) =>  {
      console.log(this.partylist);
      this.partylist=res.recordset;
      params.api.setRowData(this.partylist);
      console.log(this.partylist);
    }, (error: any) => {
      console.log(error);
    });
  }

  cancelContactsForm(){
    this.contactsBool = false;
    this.dashboardBool = true;
  }

  onSubmitContactForm(){

  }

  quickempSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
  quickPartySearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
  
  onViewCellClicked(event: any){
    console.log(event.data);
    if (event.column.colId =="NAME" ) // only first column clicked
    {
      this.varName = event.data.NAME;
      this.varMobile= event.data.MOBILE;
      this.varEmailId=event.data.EMAIL_ID;
      this.varAddress1=event.data.ADD1;
      this.varAddress2=event.data.ADD2;
      this.varAddress3=event.data.ADD3;
      this.varPobox=event.data.POBOX;
      this.varFlatnbr=event.data.FLAT;
      this.varHousenbr=event.data.BUILDING;
      this.varPcode=event.data.PCODE;
      this.getAccountData(this.varPcode);
      //this.varArea=event.data.Area;
      this.varFax1=event.data.FAX1;
      this.varFax2=event.data.FAX2;
      this.varPhone1=event.data.PHONE1;
      this.varPhone2=event.data.PHONE2;
      this.varBlocknbr=event.data.BLOCK;
      this.varPartyId=event.data.PARTY_ID;
      this.varCity=event.data.CITY;
      this.varRoadnbr=event.data.STREET;
      this.varIs_Primary=event.data.IS_PRIMARY;
      this.varCreatedt=event.data.CREATEDT;
    }
    if (event.column.colId =="PARTY_ID" ) // only first column clicked
    {
      this.varName = event.data.NAME;
      this.varMobile= event.data.MOBILE;
      this.varEmailId=event.data.EMAIL_ID;
      this.varAddress1=event.data.ADD1;
      this.varAddress2=event.data.ADD2;
      this.varAddress3=event.data.ADD3;
      this.varPobox=event.data.POBOX;
      this.varFlatnbr=event.data.FLAT;
      this.varHousenbr=event.data.BUILDING;
      this.varPcode=event.data.PCODE;
      this.getAccountData(this.varPcode);
      //this.varArea=event.data.Area;
      this.varFax1=event.data.FAX1;
      this.varFax2=event.data.FAX2;
      this.varPhone1=event.data.PHONE1;
      this.varPhone2=event.data.PHONE2;
      this.varBlocknbr=event.data.BLOCK;
      this.varPartyId=event.data.PARTY_ID;
      this.varCity=event.data.CITY;
      this.varRoadnbr=event.data.STREET;
      this.varIs_Primary=event.data.IS_PRIMARY;
      this.varCreatedt=event.data.CREATEDT;
    }
    if (event.column.colId =="ADD1" ) // only first column clicked
    {
      this.varName = event.data.NAME;
      this.varMobile= event.data.MOBILE;
      this.varEmailId=event.data.EMAIL_ID;
      this.varAddress1=event.data.ADD1;
      this.varAddress2=event.data.ADD2;
      this.varAddress3=event.data.ADD3;
      this.varPobox=event.data.POBOX;
      this.varFlatnbr=event.data.FLAT;
      this.varHousenbr=event.data.BUILDING;
      this.varPcode=event.data.PCODE;
      this.getAccountData(this.varPcode);
      //this.varArea=event.data.Area;
      this.varFax1=event.data.FAX1;
      this.varFax2=event.data.FAX2;
      this.varPhone1=event.data.PHONE1;
      this.varPhone2=event.data.PHONE2;
      this.varBlocknbr=event.data.BLOCK;
      this.varPartyId=event.data.PARTY_ID;
      this.varCity=event.data.CITY;
      this.varRoadnbr=event.data.STREET;
      this.varIs_Primary=event.data.IS_PRIMARY;
      this.varCreatedt=event.data.CREATEDT;
    }
    if (event.column.colId =="EMAIL_ID" ) // only first column clicked
    {
      this.varName = event.data.NAME;
      this.varMobile= event.data.MOBILE;
      this.varEmailId=event.data.EMAIL_ID;
      this.varAddress1=event.data.ADD1;
      this.varAddress2=event.data.ADD2;
      this.varAddress3=event.data.ADD3;
      this.varPobox=event.data.POBOX;
      this.varFlatnbr=event.data.FLAT;
      this.varHousenbr=event.data.BUILDING;
      this.varPcode=event.data.PCODE;
      this.getAccountData(this.varPcode);
      //this.varArea=event.data.Area;
      this.varFax1=event.data.FAX1;
      this.varFax2=event.data.FAX2;
      this.varPhone1=event.data.PHONE1;
      this.varPhone2=event.data.PHONE2;
      this.varBlocknbr=event.data.BLOCK;
      this.varPartyId=event.data.PARTY_ID;
      this.varCity=event.data.CITY;
      this.varRoadnbr=event.data.STREET;
      this.varIs_Primary=event.data.IS_PRIMARY;
      this.varCreatedt=event.data.CREATEDT;
    }
  }
  
  getAccountData(pcode:string) {
    this.financeservice.getAccountCode(pcode,String(this.currentYear)).subscribe((res: any) => {
      this.mAccountDetails = res.recordset[0];
      console.log(this.mAccountDetails);
    }, (err: any) => {
      console.log(err);
    })
  }


  AddRows(){
    // console.log("a");
    //   var rowta={
    //     PARTY_ID:1223, NAME:"rakshak", TYPE: "c", ADD1: "asdf", ADD2: "dsaf", MOBILE: "123645", EMAIL_ID: "asd@dmail.com",FLAT: "123456",BUILDING: "26",BLOCK: "100"
    //   }
    //   console.log([rowta]);
    //   this.gridApi.api.addItems([rowta]);
    //   this.gridApi.api.refreshView();
    this.gridApi.api.updateRowData({
      add: [{ PARTY_ID:1223, NAME:"rakshak", TYPE: "c", ADD1: "asdf", ADD2: "dsaf", MOBILE: "123645", EMAIL_ID: "asd@dmail.com",FLAT: "123456",BUILDING: "26",BLOCK: "100" }]
    });
  }
}
