import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit {

  displayedColumns:string[]=['name','category','price','quantity','total'];
  dataSource:any[] = [];
  data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef: MatDialogRef<ViewBillProductsComponent>) { }

  ngOnInit() {
    this.data = this.dialogData.data;
  // this.dataSource = JSON.parse(this.dialogData.data.productDetails);
  // console.log("dataSource: ",this.dataSource);

   // Ensure productDetails is parsed correctly
    try {
      this.dataSource = typeof this.dialogData.data.productDetails === 'string'
        ? JSON.parse(this.dialogData.data.productDetails)
        : this.dialogData.data.productDetails;
    } catch (error) {
      console.error('Error parsing productDetails:', error);
      this.dataSource = [];
    }

    console.log("dataSource: ", this.dataSource);
   }
}
