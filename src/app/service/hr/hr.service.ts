import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
 providedIn: 'root'
})
export class HrserviceServices {

 private url = 'http://15.185.46.105:5000/api';
  
 constructor(private http: HttpClient) { }

  getEmployeeDetails(empno: string) { 
    return this.http.get(this.url + '/search/employee/' + empno)
  }

  getleaveType() { 
    return this.http.get(this.url + '/leave/type')
  }
 
  getemplist() { 
    return this.http.get(this.url + '/list/emp')
  }

  getempshortlist() {
    return this.http.get(this.url + '/list/emp')
  }
}

