import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/service/finance/finance.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.scss']
})


export class FinancialsComponent implements OnInit {
  year = '2020';

  tbData!: any[];
  tbDataTotal = {
    DR_OPBAL: 0,
    CR_OPBAL: 0,
    DR_BAL: 0,
    CR_BAL: 0,
    DR_NETBAL: 0,
    CR_NETBAL: 0,
  };

  constructor(private tbservice: FinanceService ) { }

  ngOnInit(): void {
    this.getTBData();
  }

  getTBData(){
    var i: number;
    this.tbservice.getTrailBalance(this.year).subscribe((res: any) => {
      this.tbData = res.recordset;
      for(i=0; i < this.tbData.length; i++) {
        this.tbDataTotal.DR_OPBAL += this.tbData[i].DR_OPBAL;
        this.tbDataTotal.CR_OPBAL += this.tbData[i].CR_OPBAL;
        this.tbDataTotal.DR_BAL += this.tbData[i].DR_BAL;
        this.tbDataTotal.CR_BAL += this.tbData[i].CR_BAL;
        this.tbDataTotal.DR_NETBAL += this.tbData[i].DR_NETBAL;
        this.tbDataTotal.CR_NETBAL += this.tbData[i].CR_NETBAL;
      };
      console.log(this.tbData);
    }, (err: any) => {
      console.log(err);
    })
  }

  getTrailBalancePrint(){
    var element = document.getElementById('table') as HTMLElement

    html2canvas(element).then((canvas) => {
        var imgdata = canvas.toDataURL('image/JPEG')

        var doc = new jsPDF()

        var width = doc.internal.pageSize.getWidth()

        var heigth = doc.internal.pageSize.getHeight()

        doc.addImage(imgdata, 'JPEG' , 0, 0, heigth, width);

        doc.save('Trail-Balance.pdf')

    })
  }
}
