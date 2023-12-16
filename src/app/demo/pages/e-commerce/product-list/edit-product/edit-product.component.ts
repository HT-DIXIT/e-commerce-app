import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  selected: any;
  EditProductForm!: FormGroup;
  statusSelected: any;
  // more addition functionality
  // showInput: boolean = false;
  // formFields: any[] = []; // Array to store form field data

  // toggleInput() {
  //   this.showInput = !this.showInput;
  //   const contentControl = this.EditProductForm.get('content');
  //   contentControl?.setValidators(this.showInput ? Validators.required : null);
  //   contentControl?.updateValueAndValidity();
  // }

  // addFormField() {
  //   this.formFields.push({}); // Add an empty object to the array
  // }

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    // this.showInput = !!this.data?.content;
    this.EditProductForm = new FormGroup({
      id: new FormControl(this.data?.id, Validators.required),
      quantity: new FormControl(this.data?.quantity, Validators.required),
      productName: new FormControl(this.data?.productName, Validators.required),
      details: new FormControl(this.data?.details, Validators.required),
      category: new FormControl(this.data?.category, Validators.required),
      price: new FormControl(this.data?.price, Validators.required),
      offerPrice: new FormControl(this.data?.offerPrice, Validators.required),
      status: new FormControl(this.data?.status, Validators.required),
      images: new FormControl(this.data?.images, Validators.required),
      date: new FormControl(this.data?.date, Validators.required)
      // 'content': new FormControl(this.data?.content, this.showInput ? Validators.required : null)
    });
  }
  submitForm() {
    if (this.EditProductForm.valid) {
      this.dialogRef.close(this.EditProductForm.value);
    }
  }
}
