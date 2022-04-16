import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/service/finance/finance.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

  cldata!: any[]
  constructor(private tbservice:FinanceService) { }

  ngOnInit(): void {
    this.getCLdata()
  }

  getCLdata(){
    this.tbservice.getAllParty().subscribe((res: any) => {
        this.cldata = res.recordset;
        console.log(this.cldata)
    }, (err: any) => {
      console.log(err)
    })
  }

  getContactList(){
    var element = document.getElementById('table') as HTMLElement

    html2canvas(element).then((canvas) => {
      var imgData = canvas.toDataURL('image/JPEG')
      var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      console.log(heightLeft)
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'file.pdf');
    })
  }
}
