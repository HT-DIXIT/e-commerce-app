// angular import
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ProductViewComponent } from './product-view/product-view.component';

// angular material import
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogRef } from '@angular/cdk/dialog';

interface Product {
  id: number;
  productName: string;
  quantity: number;
  details: string;
  category: string;
  price: string;
  offerPrice: string;
  status: string;
  images: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SharedModule, AddProductComponent, EditProductComponent, DeleteProductComponent, ProductViewComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {
  // public props
  searchText: any;
  dataSource: any;
  productData: Product[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['position', 'name', 'categories', 'qty', 'price', 'status', 'date', 'actions'];

  // constructor
  constructor(public dialog: MatDialog) {}

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
    // here data show in data table
    if (localStorage.getItem('productData')) {
      let data: any = localStorage.getItem('productData');
      this.productData = JSON.parse(data);
      this.dataSource = new MatTableDataSource<Product>(this.productData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      localStorage.setItem('productData', JSON.stringify(this.productData));
      this.dataSource = new MatTableDataSource<Product>(this.productData);
    }
  }

  // Here add new product data
  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      // if result get undefined to add data random here
      if (result !== undefined) {
        this.pushNewData(result);
      }
    });
  }

  pushNewData(result: object) {
    // let id = Math.floor(Math.random() * 1000)
    // result['id'] = id
    let data: any = localStorage.getItem('productData');
    data = JSON.parse(data);
    data.push(result);
    localStorage.setItem('productData', JSON.stringify(data));
    this.getProductData();
  }

  stock(value: string) {
    if (localStorage.getItem('productData')) {
      let data: any = localStorage.getItem('productData');
      this.productData = JSON.parse(data);
      this.dataSource = this.productData.filter((x: any) => x.status === value);
      console.log(this.dataSource);
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
      console.log(this.dataSource);
    }
  }

  // product View Data
  ProductView(product: any) {
    const ProductViewData = this.dialog.open(ProductViewComponent, {
      width: '550px',
      data: product
    });

    ProductViewData.afterClosed().subscribe((result) => {
      console.log('data', result);
    });
  }

  // Edit Product Data
  EditData(id: number) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(EditProductComponent, {
        width: '550px',
        data: id
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.updateData(result);
        }
      });
    }
  }

  // Old Data change with new Data Here
  updateData(data: any) {
    const updatedUserData = this.productData.map((user) => {
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
          images: data?.images,
          date: data?.date,
          content: data?.content
        };
      }
      return user; // Return unchanged users
    });
    localStorage.setItem('productData', JSON.stringify(updatedUserData));
    this.getProductData();
  }

  // filter And Find Data
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const searchText = filter.toLowerCase();
      return (
        data.productName.toLowerCase().includes(searchText) ||
        data.details.toLowerCase().includes(searchText) ||
        data.status.toLowerCase().includes(searchText) ||
        data.category.toLowerCase().includes(searchText)
      );
    };
  }

  // Delete Data
  DeleteData(id: number) {
    if (id !== undefined) {
      const dialogRef = this.dialog.open(DeleteProductComponent, {
        width: '250px',
        data: id
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          let newData: any = localStorage.getItem('productData');
          newData = JSON.parse(newData);
          newData = newData.filter((x: any) => x.id !== result);
          localStorage.setItem('productData', JSON.stringify(newData));
          this.getProductData();
        }
      });
    }
  }
}
