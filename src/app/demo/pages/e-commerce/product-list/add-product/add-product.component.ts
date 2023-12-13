import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm: any;
  selected: any;
  statusSelected: any;
  showInput: boolean = false;
  formFields: any[] = []; // Array to store form field data
  
  toggleInput() {
    this.showInput = !this.showInput;
  }

  addFormField() {
    this.formFields.push({}); // Add an empty object to the array
  }

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  submitForm(){
    if(this.productForm.valid){
      this.dialogRef.close(this.productForm.value);
    }
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'id' : new FormControl('',Validators.required),
      'quantity' : new FormControl('',Validators.required),
      'productName' : new FormControl('',Validators.required),
      'details' : new FormControl('',Validators.required),
      'category' : new FormControl('',Validators.required),
      'price' : new FormControl('',Validators.required),
      'offerPrice' : new FormControl('',Validators.required),
      'status' : new FormControl('',Validators.required),
      'images' : new FormControl('',Validators.required),
      'date': new FormControl('', Validators.required),
      'content': new FormControl('', Validators.required)
    })
  }
 
}
