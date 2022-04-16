import { Component, OnInit, TemplateRef, ViewChild, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/service/inventory/inventory.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stockissue',
  templateUrl: './stockissue.component.html',
  styleUrls: ['./stockissue.component.scss']
})

export class StockissueComponent implements OnInit {

  @ViewChild('prodLookupDialog') prodLookupDialog!: TemplateRef<any>;
  @ViewChild('locWiseProdLookupDialog') locWiseProdLookupDialog!: TemplateRef<any>;
  @ViewChild('jobsLookupDialog') jobsLookupDialog!: TemplateRef<any>;
  @ViewChild('sivLookupDialog') sivLookupDialog!: TemplateRef<any>;
  @ViewChild('printSivDialog') printSivDialog!: TemplateRef<any>;
  @ViewChild('siItem') siItem!: QueryList<ElementRef>;
  
  stockIssueForm: FormGroup;
  unitArr: any[] = [];
  locsArr: any[] = [];
  deptArr: any[] = [];
  jobsArr: any[] = [];
  prodArr: any[] = [];
  costCtrArr: any[] = [];
  sivArr: any[] = [];
  prodIndex: number = 0;
  mNewSivNo = '';
  mSivNo = '';
  mYear = '2021';
  mMaxQty: any = 10000;
  mPcode = '';
  mDeptID = '';
  mDeptType = '';
  mJob = '';
  mCostCentrID = '';
  mGLCode = '';
  mLoc = '';
  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  prodDisplayedColumns: string[] = ['pcode', 'desc', 'qty', 'unit'];
  prodDataSource = new MatTableDataSource(this.prodArr);

  locsDisplayedColumns: string[] = ['loc', 'opQty', 'ttlIn', 'ttlOut', 'curQty', 'rsvrQty'];
  locsDataSource = new MatTableDataSource(this.locsArr);

  jobsDisplayedColumns: string[] = ['orderno', 'jobname', 'jobno', 'glcode'];
  jobsDataSource = new MatTableDataSource(this.jobsArr);

  sivDisplayedColumns: string[] = ['trnno', 'invno', 'amount', 'lname', 'refno', 'narration'];
  sivDataSource = new MatTableDataSource(this.sivArr);
  selectedRowIndex: any = 0;

  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.lpqlDataSource.filter = filterValue.trim().toLowerCase();
  }*/

  constructor(private inventoryService: InventoryService, private dialog: MatDialog, public snackBar: MatSnackBar){ 
    this.stockIssueForm = new FormGroup({
      siRefNo: new FormControl('', []),
      siIssueDate: new FormControl(this.mCurDate, [Validators.required]),
      siNarration: new FormControl('', [Validators.required]),
      siMatReqNbr: new FormControl('', []),
      siItemArray: new FormArray([]),
      siRecievedBy: new FormControl('', [Validators.required]),
      siIssuedBy: new FormControl('', [Validators.required]),
      siApprovedBy: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getDept();
    this.getUnit();
  }

  addSIItem() {
    const lastInd = this.siItems.length - 1;
    const lastEle = this.siItems.at(lastInd).value;
    if(lastEle.siItemCode === "") {
      console.log(lastEle.siItemCode);
    } else {
      const stockIssue = new FormGroup({
        siItemCode: new FormControl('', [ Validators.required]),
        siDesc: new FormControl('', [ Validators.required]),
        siLoc: new FormControl(this.mLoc, [ Validators.required]),
        siQty: new FormControl('', [ Validators.required]),
        siUoM: new FormControl('', [ Validators.required]),
        siCP: new FormControl('', [ Validators.required]),
        siDept: new FormControl(this.mDeptID, [ Validators.required]),
        siJob: new FormControl(this.mJob, [ Validators.required]),
        siCostCtr: new FormControl('', [ Validators.required]),
        siGLCode: new FormControl(this.mGLCode, [Validators.required])
      });
      this.siItems.push(stockIssue);
      //this.siItem.last.nativeElement.focus();
    }
  }

  deleteSIItem(index: number) {
    if(this.siItems.length === 1){
      console.log(this.siItems)
    } else {
      this.siItems.removeAt(index);
    }
    //this.siItem.last.nativeElement.focus();
  }

  onFormSubmit() {
    const data = this.stockIssueForm.value;
    if(data.siRefNo === '***NEW***') {
      this.inventoryService.getSivDocNo(this.mYear).subscribe((res: any) => {
        this.mNewSivNo = res.recordset[0].FIELD_VALUE_NM + 1;
          var total = 0;
          for(let i=0; i<data.siItemArray.length; i++) {
            total += Number(data.siItemArray[i].siQty) * Number(data.siItemArray[i].siCP);
          }
        const newTranNo = 'SI21-' + this.mNewSivNo.toString();
        data.siRefNo = newTranNo;
        this.inventoryService.postTranHead(this.mYear, data.siRefNo, data.siIssueDate, data.siRecievedBy, total.toString(), data.siNarration, data.siIssuedBy, data.siIssueDate, data.siIssuedBy, this.mCurDate);
        for(let i=0; i<data.siItemArray.length; i++) {
          const ind = this.unitArr.findIndex(x => x.UNIT_DESCRIPTION === data.siItemArray[i].siUoM);
          const unit = this.unitArr[ind].UNIT_CODE;
          this.inventoryService.postTranDetail(this.mYear, data.siRefNo, data.siItemArray[i].siItemCode, data.siItemArray[i].siLoc, data.siItemArray[i].siDept, unit, data.siItemArray[i].siJob, data.siItemArray[i].siCostCtr, data.siItemArray[i].siGLCode, data.siItemArray[i].siQty);
          this.inventoryService.postStockTR(this.mYear, data.siRefNo, data.siIssueDate, data.siItemArray[i].siItemCode, data.siItemArray[i].siDesc, data.siItemArray[i].siLoc, unit, data.siItemArray[i].siJob, data.siItemArray[i].siQty, data.siItemArray[i].siCP, data.siIssuedBy, data.siIssueDate, data.siIssuedBy, this.mCurDate
        );
        }
        var sglDataTempArr: any[] = [];
        for(let i=0; i<data.siItemArray.length; i++) {
          console.log(data.siItemArray[i]);
          const prodVal = Number(data.siItemArray[i].siQty) * Number(data.siItemArray[i].siCP);
          const val = {
            glcode: data.siItemArray[i].siGLCode,
            jobno: data.siItemArray[i].siJob,
            amt: prodVal
          }
          if(sglDataTempArr.length === 0) {
            sglDataTempArr.push(val);
          } else {
            for(let j=0; j<sglDataTempArr.length; j++) {
              if(sglDataTempArr[j].glcode === val.glcode) {
                sglDataTempArr[j].amt += val.amt;
                break;
              } else { 
                sglDataTempArr.push(val);
                break;
              }
            }
          }
        }
        this.inventoryService.postSglDataTemp(this.mYear, data.siRefNo, data.siIssueDate, 'C', 'A2080001', total, ' ', 0, data.siNarration);
        for(let i=0; i<sglDataTempArr.length; i++) {
          console.log(sglDataTempArr[i]);
          this.inventoryService.postSglDataTemp(this.mYear, data.siRefNo, data.siIssueDate, 'D', sglDataTempArr[i].glcode, total, sglDataTempArr[i].jobno, sglDataTempArr[i].amt, data.siNarration);
        }
        this.inventoryService.UpdateSivDocNo(this.mYear, this.mNewSivNo);
        this.snackBar.open(newTranNo + " successfully added", "close", {
          duration: 10000,
          verticalPosition: 'top',
          panelClass: ['sbBg']
        });
        this.refreshForm();
      }, (err: any) => {
        console.log(err);
      });
    } else {
      this.inventoryService.deleteTran(this.mYear, data.siRefNo).subscribe((res: any) => {
        console.log(res);
        var total = 0;
        for(let i=0; i<data.siItemArray.length; i++) {
          total += Number(data.siItemArray[i].siQty) * Number(data.siItemArray[i].siCP);
        }
        this.inventoryService.postTranHead(this.mYear, data.siRefNo, data.siIssueDate, data.siRecievedBy, total.toString(), data.siNarration, data.siIssuedBy, data.siIssueDate, data.siIssuedBy, data.siIssueDate);
        for(let i=0; i<data.siItemArray.length; i++) {
          const ind = this.unitArr.findIndex(x => x.UNIT_DESCRIPTION === data.siItemArray[i].siUoM);
          const unit = this.unitArr[ind].UNIT_CODE;
          this.inventoryService.postTranDetail(this.mYear, data.siRefNo, data.siItemArray[i].siItemCode, data.siItemArray[i].siLoc, data.siItemArray[i].siDept, unit, data.siItemArray[i].siJob, data.siItemArray[i].siCostCtr, data.siItemArray[i].siGLCode, data.siItemArray[i].siQty);
        }
        for(let i=0; i<data.siItemArray.length; i++) {
          const ind = this.unitArr.findIndex(x => x.UNIT_DESCRIPTION === data.siItemArray[i].siUoM);
          const unit = this.unitArr[ind].UNIT_CODE;
          this.inventoryService.postStockTR(this.mYear, data.siRefNo, data.siIssueDate, data.siItemArray[i].siItemCode, data.siItemArray[i].siDesc, data.siItemArray[i].siLoc, unit, data.siItemArray[i].siJob, data.siItemArray[i].siQty, data.siItemArray[i].siCP, data.siIssuedBy, data.siIssueDate, data.siIssuedBy, data.siIssueDate);
        }
        var sglDataTempArr: any[] = [];
        for(let i=0; i<data.siItemArray.length; i++) {
          const prodVal = Number(data.siItemArray[i].siQty) * Number(data.siItemArray[i].siCP);
          const val = {
            glcode: data.siItemArray[i].siGLCode,
            jobno: data.siItemArray[i].siJob,
            amt: prodVal
          }
          if(sglDataTempArr.length === 0) {
            sglDataTempArr.push(val);
          } else {
            for(let j=0; j<sglDataTempArr.length; j++) {
              if(sglDataTempArr[j].glcode === val.glcode) {
                sglDataTempArr[j].amt += val.amt;
                break;
              } else { 
                sglDataTempArr.push(val);
                break;
              }
            }
          }
        }
        this.inventoryService.postSglDataTemp(this.mYear, data.siRefNo, data.siIssueDate, 'C', 'A2080001', total, ' ', 0, data.siNarration);
        console.log('TRAN CREDIT SGLDATATEMP INSERTED')
        for(let i=0; i<sglDataTempArr.length; i++) {
          console.log(sglDataTempArr[i]);
          this.inventoryService.postSglDataTemp(this.mYear, data.siRefNo, data.siIssueDate, 'D', sglDataTempArr[i].glcode, total, sglDataTempArr[i].jobno, sglDataTempArr[i].amt, data.siNarration);
          console.log('TRAN DEBIT SGLDATATEMP INSERTED')
        }
        this.snackBar.open(data.siRefNo + " successfully Updated", "close", {
          duration: 10000,
          verticalPosition: 'top',
          panelClass: ['sbBg']
        });
        this.refreshForm();
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  get siItems(): FormArray {
    return this.stockIssueForm.get('siItemArray') as FormArray
  }

  checkProduct(productCode: string, index: number) {
    this.mPcode = productCode;
    this.prodIndex = index;      

    this.inventoryService.getProductDetails(productCode, this.mYear).subscribe((res: any) => {
      const rowData: any = {
        siDesc: res.recordset[0].DESCRIPTION,
        siUoM: res.recordset[0].BASE_UNIT_DESCRIPTION,
        siCP: res.recordset[0].COSTPRICE,
        siCostCtr: res.recordset[0].EXP_ID
      }
      this.mCostCentrID = res.recordset[0].EXP_ID;
      this.siItems.at(index).patchValue(rowData);
    }, (err: any) => {
      console.log(err);
    })
  }

  getLocWiseProd(pcode: any){
    this.inventoryService.getLocWiseProds(pcode, this.mYear).subscribe((res: any) => {
      this.locsArr = res.recordset;
      this.locsDataSource = new MatTableDataSource(this.locsArr);
    }, (err: any) => {
      console.log(err);
    })
  }

  getDept(){
    this.inventoryService.getDept().subscribe((res: any) => {
      this.deptArr = res.recordset;
    }, (err: any) => {
      console.log(err);
    })
  }

  getUnit(){
    this.inventoryService.getUnit().subscribe((res: any) => {
      this.unitArr = res.recordset;
    }, (err: any) => {
      console.log(err);
    })
  }

  setDept(event: any){
    this.mDeptID = event.target.value;
    const indx = this.deptArr.findIndex(x => x.DEPT_ID === Number(this.mDeptID));
    this.mDeptType = this.deptArr[indx].EXPENSE_TYPE;
    const rowData: any = {
      siDept: this.mDeptID
    }
    this.siItems.at(this.prodIndex).patchValue(rowData);
    if(this.mDeptType === "I") {
      this.inventoryService.getDeptCostCtr(this.mDeptID).subscribe((res: any) => {
        this.costCtrArr = res.recordset;
        const ind = this.costCtrArr.findIndex(x => x.EXP_ID === Number(this.mCostCentrID));
        this.mGLCode = this.costCtrArr[ind].GLCODE;
        const rowData: any = {
          siJob: "-",
          siGLCode: this.mGLCode
        }
        this.siItems.at(this.prodIndex).patchValue(rowData);
      }, (err: any) => {
        console.log(err);
      })
    }
  }
 
  lookUpProds(value: string, type: string, index: number) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.prodLookupDialog);
    if (type === "pcode") {
      this.inventoryService.searchProductByPcode(value, this.mYear).subscribe((res: any)=> {
        this.prodArr = res.recordset;
        this.prodDataSource = new MatTableDataSource(this.prodArr);
        this.prodIndex = index;      
      }, (err: any) => {
        console.log(err);
      })
    } else if (type === "desc") {
      this.inventoryService.searchProductByDesc(value, this.mYear).subscribe((res: any) => {
        this.prodArr = res.recordset;
        this.prodIndex = index;      
        this.prodDataSource = new MatTableDataSource(this.prodArr);
      }, (err: any) => {
        console.log(err);
      })
    }
  }

  lookUpLocs(itemcode: any) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.locWiseProdLookupDialog);    
    this.getLocWiseProd(itemcode);
  }

  lookUpJobs(value: string) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.jobsLookupDialog);    
    this.inventoryService.getJobNo(this.mDeptID, value, this.mYear).subscribe((res: any) => {
      this.jobsArr = res.recordset;
      this.jobsDataSource = new MatTableDataSource(this.jobsArr);
    }, (err: any) => {
      console.log(err);
    })
  }

  lookUpSiv(value: string) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.sivLookupDialog);    
    this.inventoryService.getTranHead(value, this.mYear).subscribe((res: any) => {
      this.sivArr = res.recordset;
      this.sivDataSource = new MatTableDataSource(this.sivArr);
    }, (err: any) => {
      console.log(err);
    })
  }

  selectProd(obj: any) {
    this.checkProduct(obj.PCODE, this.prodIndex);
    const rowData: any = {
      siItemCode: obj.PCODE
    }
    this.siItems.at(this.prodIndex).patchValue(rowData);
    let dialogRef = this.dialog.closeAll();
  }

  selectLoc(obj: any) {
    this.mMaxQty = obj.CURRENT_QTY;
    this.mLoc = obj.LOCATION_ID;
    const rowData: any = {
      siLoc: obj.LOCATION_ID
    }
    this.siItems.at(this.prodIndex).patchValue(rowData);
    let dialogRef = this.dialog.closeAll();
  }

  selectJob(obj: any) {
    this.mJob = obj.orderno;
    this.mGLCode = obj.glcode;
    const rowData: any = {
      siJob: obj.orderno,
      siGLCode: obj.glcode
    }
    this.siItems.at(this.prodIndex).patchValue(rowData);
    let dialogRef = this.dialog.closeAll();
  }

  searchSiv(trnno: any) {
    this.inventoryService.searchTranHead(trnno, this.mYear).subscribe((res: any) => {
      this.selectSiv(res.recordset[0]);
    }, (err: any) => {
      console.log(err);
    })
  }

  selectSiv(obj: any) {
    this.mSivNo = obj.TRN_NO;
    this.siItems.clear();
    const date = this.formatDate(obj.TRN_DATE);
    this.stockIssueForm.patchValue({
      siRefNo: obj.TRN_NO,
      siIssueDate: date,
      siNarration: obj.NARRATION,
      siRecievedBy: obj.LNAME,
      siIssuedBy: obj.CREATEUSER,
    });
    this.inventoryService.getTranDetailBreakup(this.mSivNo, this.mYear).subscribe((res: any) => {
      const itemArr = res.recordset;
      for(let x=0; x<itemArr.length; x++) {
        this.inventoryService.getStockTR(this.mSivNo, this.mYear).subscribe((resp: any) => {
          for(let i=0; i<resp.recordset.length; i++) {
            if (itemArr[x].PCODE === resp.recordset[i].PCODE) {
              const stockIssue = new FormGroup({
                siItemCode: new FormControl(itemArr[x].PCODE, [Validators.required]),
                siDesc: new FormControl(resp.recordset[i].DESCRIPTION, [Validators.required]),
                siLoc: new FormControl(itemArr[x].LOCATIONID, [Validators.required]),
                siQty: new FormControl(itemArr[x].QTY, [Validators.required]),
                siUoM: new FormControl(this.unitArr[resp.recordset[i].UNIT_CODE - 1].UNIT_DESCRIPTION, [Validators.required]),
                siCP: new FormControl(resp.recordset[i].UNITCOSTPRICE, [Validators.required]),
                siDept: new FormControl(itemArr[x].DEPT_ID, [Validators.required]),
                siJob: new FormControl(itemArr[x].JOB_NO, [Validators.required]),
                siCostCtr: new FormControl(itemArr[x].EXP_ID, [Validators.required]),
                siGLCode: new FormControl(itemArr[x].GLCODE, [Validators.required])
              });
              this.siItems.push(stockIssue);
            }
          }
        }, (error: any) => {
          console.log(error);
        })
      }
    }, (err: any) => {
      console.log(err);
    })
    let dialogRef = this.dialog.closeAll();
  }

  highlight(type: string, index: number){
    if(type === "prod"){
      if(index >= 0 && index <= this.prodArr.length - 1)
      this.selectedRowIndex = index;
    } else if (type === "locs") {
      if(index >= 0 && index <= this.locsArr.length - 1)
      this.selectedRowIndex = index;
    } else if (type === "jobs") {
      if(index >= 0 && index <= this.jobsArr.length - 1)
      this.selectedRowIndex = index;
    } else if (type === "sivs") {
      if(index >= 0 && index <= this.sivArr.length - 1)
      this.selectedRowIndex = index;
    }
  }

  arrowUpEvent(type: string, index: number){
   this.highlight(type, --index);
  }

  arrowDownEvent(type: string, index: number){
    this.highlight(type, ++index);
  }

  newForm() {
    this.stockIssueForm = new FormGroup({
      siRefNo: new FormControl('***NEW***', []),
      siIssueDate: new FormControl(this.mCurDate, [Validators.required]),
      siNarration: new FormControl('', [Validators.required]),
      siMatReqNbr: new FormControl('', []),
      siItemArray: new FormArray([]),
      siRecievedBy: new FormControl('', [Validators.required]),
      siIssuedBy: new FormControl('', [Validators.required]),
      siApprovedBy: new FormControl('', [Validators.required]),
    });
    this.prodIndex = 0;
    this.mSivNo = '';
    this.mYear = '2021';
    this.mMaxQty = 0;
    this.mPcode = '';
    this.mDeptID = '';
    this.mDeptType = '';
    this.mJob = '';
    this.mCostCentrID = '';
    this.mGLCode = '';
    this.mLoc = '';
    this.mCurDate = this.formatDate(this.utc);
    const stockIssue = new FormGroup({
      siItemCode: new FormControl('', [Validators.required]),
      siDesc: new FormControl('', [Validators.required]),
      siLoc: new FormControl(this.mLoc, [Validators.required]),
      siQty: new FormControl('', [Validators.required]),
      siUoM: new FormControl('', [Validators.required]),
      siCP: new FormControl('', [Validators.required]),
      siDept: new FormControl(this.mDeptID, [Validators.required]),
      siJob: new FormControl(this.mJob, [Validators.required]),
      siCostCtr: new FormControl('', [Validators.required]),
      siGLCode: new FormControl(this.mGLCode, [Validators.required])
    });
    this.siItems.push(stockIssue);
  }

  refreshForm() {
    this.stockIssueForm = new FormGroup({
      siRefNo: new FormControl('', []),
      siIssueDate: new FormControl(this.mCurDate, [Validators.required]),
      siNarration: new FormControl('', [Validators.required]),
      siMatReqNbr: new FormControl('', []),
      siItemArray: new FormArray([]),
      siRecievedBy: new FormControl('', [Validators.required]),
      siIssuedBy: new FormControl('', [Validators.required]),
      siApprovedBy: new FormControl('', [Validators.required]),
    });
    this.prodIndex = 0;
    this.mSivNo = '';
    this.mYear = '2021';
    this.mMaxQty = 10000;
    this.mPcode = '';
    this.mDeptID = '';
    this.mDeptType = '';
    this.mJob = '';
    this.mCostCentrID = '';
    this.mGLCode = '';
    this.mLoc = '';
    this.mCurDate = this.formatDate(this.utc);
  }

  printForm() {
    const data = this.stockIssueForm.value;
    this.mSivNo = data.siRefNo;
    let dialogRef = this.dialog.open(this.printSivDialog);
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }
} 