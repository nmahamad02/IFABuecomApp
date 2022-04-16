import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
1
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private url = 'http://15.185.46.105:5000/api';
  
  constructor(private http: HttpClient) { }
 
  getProductDetails(productCode: string, year: string) { 
    return this.http.get(this.url + '/product/' + productCode + '/' + year)
  }

  getUnit() {
    return this.http.get(this.url + '/products/units')
  }

  searchProductByPcode(productCode: string, year: string) { 
    return this.http.get(this.url + '/search/product/pcode/' + productCode + '/' + year)
  }

  searchProductByDesc(prodDesc: string, year: string) { 
    return this.http.get(this.url + '/search/product/desc/' + prodDesc + '/' + year)
  }

  getLocList(year: string){
    return this.http.get(this.url + '/loc/list/' + year)
  }

  getLocWiseProds(pcode: string, year: string) {
    return this.http.get(this.url + '/locWiseProd/' + pcode + '/' + year)
  }

  getDept() { 
    return this.http.get(this.url + '/depts')
  }

  getDeptCostCtr(deptId: string) {
    return this.http.get(this.url + '/deptCostCtr/' + deptId)
  }

  getJobNo(deptid: string, jobname: string, year: string) { 
    return this.http.get(this.url + '/jobs/' + deptid + '/' + jobname + '/' + year)
  }

  getTranHead(trnno: string, year: string) {
    return this.http.get(this.url + '/coa/getTranHead/' + trnno + '/' + year)
  }

  searchTranHead(trnno: string, year: string) {
    return this.http.get(this.url + '/coa/searchTranHead/' + trnno + '/' + year)
  }

  getStockTR(trnno: string, year: string) {
    return this.http.get(this.url + '/coa/getStockTR/' + trnno + '/' + year)
  }

  getTranDetailBreakup(trnno: string, year: string) {
    return this.http.get(this.url + '/coa/getTranDetailBreakup/' + trnno + '/' + year)
  }

  getSivDocNo(year: string) {
    return this.http.get(this.url + '/coa/getsivnodoc/' + year)
  }

  UpdateSivDocNo(year: string, newVal: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newValue = {
      newVal: newVal,
      year: year
    }

    this.http.post(this.url + '/coa/updatesivnodoc', JSON.stringify(newValue), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postTranHead(year: string, trnno: string, trndate: string, lname: string, total: string, remarks: string, createUser: string, createDate: string, editUser: string, editDate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      year: year,
      trnno: trnno, 
      trndate: trndate,
      lname: lname,
      total: total,
      remarks: remarks,
      createUser: createUser,
      createDate: createDate,
      editUser: editUser,
      editDate: editDate
    }

    this.http.post(this.url + '/coa/postTranHead', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postTranDetail(year: string, trnno: string, pcode: string, locationid: string, deptid: string, unitcode: string, jobno: string, expid: string, glcode: string, qty: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      year: year,
      trnno: trnno, 
      pcode: pcode,
      locationid: locationid,
      deptid: deptid,
      unitcode: unitcode,
      jobno: jobno,
      expid: expid,
      glcode: glcode,
      qty: qty
    }

    this.http.post(this.url + '/coa/posttrandetailbreakup', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postStockTR(year: string, trnno: string, trndate: string, pcode: string, description: string, locationid: string, unitcode: string, jobno: string, qty: string, costprice: string, createUser: string, createDate: string, editUser: string, editDate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      year: year,
      trnno: trnno, 
      trndate: trndate,
      pcode: pcode,
      description: description,
      locationid: locationid,
      unitcode: unitcode,
      jobno: jobno,
      qty: qty,
      costprice: costprice,
      createUser: createUser,
      createDate: createDate,
      editUser: editUser,
      editDate: editDate
    }

    this.http.post(this.url + '/coa/poststocktr', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postSglDataTemp(year: string, trnno: string, trndate: string, type: string, glcode: string, total: number, jobno: string, prodAmt: number, remarks: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      year: year,
      trnno: trnno, 
      trndate: trndate,
      jobno: jobno,
      type: type,
      glcode: glcode,
      total: total,
      prodAmt: prodAmt,
      remarks: remarks
    }
    this.http.post(this.url + '/coa/postsgldatatemp', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    }) 
  }

  deleteTran(year: string, trnno: string) {
    return this.http.get(this.url + '/coa/deleteTran/' + trnno + '/' + year)
  }      
 
}
