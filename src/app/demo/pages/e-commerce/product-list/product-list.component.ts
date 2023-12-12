import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductComponent } from './add-product/add-product.component';
import { MatSort } from '@angular/material/sort';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';


interface Product {
  id: number;
  productName: string,
  quantity: number,
  details: string,
  category: string,
  price: string,
  offerPrice: string;
  status: string;
  images: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SharedModule, AddProductComponent, EditProductComponent, DeleteProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {

  searchText: any;
  dataSource: any
  productData: Product[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  displayedColumns: string[] = ['position', 'name', 'categories', 'qty', 'price', 'status', 'actions'];

  // constructor
  constructor(public dialog: MatDialog,) { }

  // life cycle event
  ngOnInit() {
    this.getProductData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // public method

  getProductData() {
    if (localStorage.getItem('productData')) {
      let data: any = localStorage.getItem('productData');
      this.productData = JSON.parse(data);;
      this.dataSource = new MatTableDataSource<Product>(this.productData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      localStorage.setItem('productData', JSON.stringify(this.productData));
      this.dataSource = new MatTableDataSource<Product>(this.productData);
    }
  }


  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'hello')
      if(result !== undefined) {
        this.pushNewData(result)
      }
    });
  }

  pushNewData(result:any){
    let id = Math.floor(Math.random() * 1000)
    result['id'] = id
    let data : any = localStorage.getItem('productData')
    data = JSON.parse(data)
    data.push(result)
    localStorage.setItem('productData',JSON.stringify(data))
    this.getProductData()
}

stock(value: string) {
  if (localStorage.getItem('productData')) {
    let data: any = localStorage.getItem('productData');
    this.productData = JSON.parse(data);
    this.dataSource = this.productData.filter((x: any) => x.status === value);
    console.log(this.dataSource)
  }
}

reset() {
  if (localStorage.getItem('productData')) {
    let data: any = localStorage.getItem('productData');
    this.productData = JSON.parse(data);
    this.dataSource = new MatTableDataSource<Product>(this.productData);
  }
}

outStock(value: string) {
  if (localStorage.getItem('productData')) {
    let data: any = localStorage.getItem('productData');
    this.productData = JSON.parse(data);
    this.dataSource = this.productData.filter((x: any) => x.status === value);
    console.log(this.dataSource)
  }

}

EditData(id:number){
  if(id !== undefined){
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '550px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        this.updateData(result)
      }
    });
  }
}

updateData(data:any){
  const updatedUserData = this.productData.map(user => {
    if (user.id === data?.id) {
      return {
        ...user,
        id: data?.id,
        quantity: data?.quantity,
        productName: data?.productName,
        details: data?.details,
        category: data?.category,
        price: data?.price,
        offerPrice: data?.offerPrice,
        status: data?.status,
        images: data?.images
      };
    }
    return user; // Return unchanged users
  });
  localStorage.setItem('productData',JSON.stringify(updatedUserData))
  this.getProductData()
}

  applyFilter(filterValue: any) { 
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const searchText = filter.toLowerCase();
      return (
        data.productName.toLowerCase().includes(searchText) ||
        data.details.toLowerCase().includes(searchText) || 
        data.status.toLowerCase().includes(searchText)  ||
        data.category.toLowerCase().includes(searchText)
      );
    };
  }

  DeleteData(id:number){

    if(id !== undefined){
      const dialogRef = this.dialog.open(DeleteProductComponent, {
        width: '250px',
        data: id,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          let newdata : any = localStorage.getItem('productData')
          newdata = JSON.parse(newdata)
          newdata = newdata.filter((i:any) => i.id !== result)
          localStorage.setItem('productData',JSON.stringify(newdata))
          this.getProductData()
        }
      });
    }
  }
}
