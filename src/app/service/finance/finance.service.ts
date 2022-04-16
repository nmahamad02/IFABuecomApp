import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FinanceService {
  private url = 'http://15.185.46.105:5000/api';
 
  constructor(private http: HttpClient) { }
  
  getTrailBalance(year: string) { 
    return this.http.get(this.url + '/reports/financials/trialbalance/' + year)
  }

  getCoa(year: string) {
    return this.http.get(this.url + '/coa/getcoa/' + year)
  }

  getMainGrp(year: string) {
    return this.http.get(this.url + '/coa/getmaingrp/' + year)
  }
  
  getSubGrp(maingrpcode:string, year: string) {
    return this.http.get(this.url + '/coa/getsubgrp/' + maingrpcode + '/' + year)
  }

  getGL(subgroupcode: string, year: string) {
    return this.http.get(this.url + '/coa/getgl/' + subgroupcode + '/' + year)
  }

  getPcode(glcode: string, year: string) {
    return this.http.get(this.url + '/coa/getpcode/' + glcode + '/' + year)
  }

  getAccountCode(pcode: string, fyear: string) { 
    return this.http.get(this.url + '/coa/getAcc/' + pcode + '/' + fyear)
  }

  getCustomerList(fyear: string) { 
    return this.http.get(this.url + '/coa/getCustomerAcc/' + fyear)
  }

  getSupplierList(fyear: string) { 
    return this.http.get(this.url + '/coa/getSupplierAcc/' + fyear)
  }

  getCustomerParty(pcode:string){
    return this.http.get(this.url + '/coa/getPartyCustomer/' + pcode)
  }
  getAllParty() {
    return this.http.get(this.url + '/ar/getAllParty')
  }

  getCustomerInvoices(pcode:string, sfyear:string, efyear:string){
    return this.http.get(this.url + '/coa/getCustomerOpening/' + pcode +'/' + sfyear + '/' + efyear)
  }

  getAccountsCategory() {
    return this.http.get(this.url + '/coa/getAccountsCategory')
  }

  getAccountsType() {
    return this.http.get(this.url + '/coa/getAccountsType')
  }

  getProducts(year:string ) {
    return this.http.get(this.url + '/productList/' + year )
  }

  getLastSiv(year: string) {
    return this.http.get(this.url + '/coa/getsivnodoc/' + year )
  }

  setNewSiv(newSivVal: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newSiv = {
      newVal: newSivVal,
      year: year
    }

    this.http.post(this.url + '/coa/updateSivDocNo', JSON.stringify(newSiv), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }
}












