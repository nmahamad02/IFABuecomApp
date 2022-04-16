import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { GridOptions } from 'ag-grid-community';
import { FinanceService } from 'src/app/service/finance/finance.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public productForm: FormGroup;
  currentYear = new Date().getFullYear()
  searchValue: any;
  gridOptions!: Partial<GridOptions>;
  gridApi: any;
  gridColumnApi:any;
  gridApiCust: any;
  gridColumnApiCust:any; 
  Productlist: any[] = [];
  ProductlocationList: any[] = [];
  RackList: any[] = [];
  columnProductDefs:any;
  columnContactDefs:any;
  columnCustomeropeningDefs:any;

  varpcode:string = ""
  varName: string = "";
  varBarcode: any ;
  varCategory: string = "";
  varSubcategory: string = "";
  varProfile: string = "";
  varColor: string="";
  varSize:string ="";
  varManufact: string ="";
  varSupplier:string = "";
  varRemarks:string = "";
  
  constructor(private financeservice:FinanceService) { 
    this.productForm = new FormGroup({
      pname: new FormControl('', [ Validators.required]),
      pbarcode: new FormControl('', [ Validators.required]),
      pcategory: new FormControl('', [ Validators.required]),
      psubcategory: new FormControl('', [ Validators.required]),
      pprofile: new FormControl('', [ Validators.required]),
      pcolor: new FormControl('', [ Validators.required]),
      psize: new FormControl('', [ Validators.required]),
      pmanufact: new FormControl('', [ Validators.required]),
      psupplier: new FormControl('', [ Validators.required]),
      premarks: new FormControl('', [ Validators.required])
    })

    this.columnProductDefs = [
      { 
        headername: "Product ID",
        sortable: true,
        field: "PCODE",
        width: 85
      },
      { 
        headerName: "Product Description", 
        field: 'DESCRIPTION', 
        width:250, 
        suppressMenu: false, 
        unSortIcon: true,
        sortable: true,
        tooltipField: "NAME", 
        headerTooltip: "NAME" 
      },
      { 
        headername: "SubCategory",
        field: "SUBCATEGORY_NAME",
        filter: true,
        rowGroup:true,
        enableRowGroup: true,
        width:75
      },
      { 
        headername: "QOH",
        filter: true,
        sortable: true,
        field: "QOH",
        width:150
      },
      { 
        headername: "RETAILPRICE",
        filter: true,
        sortable: true,
        field: "RETAILPRICE",
        width:150
      },
    ];
    
  }
  onGridProductReady(params: any){ 
    this.gridApi= params.api;
    this.gridColumnApi= params.columnApi;
    this.financeservice.getProducts(String(this.currentYear)).subscribe((res: any) =>  {
      console.log(this.Productlist);
      this.Productlist=res.recordset;
      params.api.setRowData(this.Productlist);
      console.log(this.Productlist);
    }, (error: any) => {
      console.log(error);
    });
  }
  
  quickProductSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
  onViewCellClicked(event: any){
  
    console.log(event.data);
    if (event.column.colId =="DESCRIPTION" ){
     this.varName = event.data.DESCRIPTION;
     this.varBarcode= event.data.BARCODE;
     this.varCategory= event.data.CATEGORY_NAME;
     this.varSubcategory = event.data.SUBCATEGORY_NAME;
     this.varProfile = event.data.PROFILE;
     this.varColor = event.data.COLOR;
     this.varSize = event.data.SIZE;
     this.varManufact = event.data.MANUFACTURER_NAME;
     this.varSupplier = event.data.SUPPLIER_NAME;
     this.varRemarks = event.data.REMARKS;
     this.varpcode = event.data.PCODE;
    //  this.getCustmerParty(this.varpcode);
    //  this.getCustmerInvoices(this.varpcode,this.varsfyear,this.varefyear);
    }
  }

  ngOnInit(): void {
  }

}