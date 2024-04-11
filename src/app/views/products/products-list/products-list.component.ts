import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../../shared/services/products.service';
import { Product } from 'src/app/models/product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  isAdmin: boolean = false;
  products: Product[] = [];
  searchText: string = '';
  originalProducts: Product[] = [];

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isAdmin = data['context'] === 'admin';
    });

    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
      this.originalProducts = [...res];
    });
  }

  Search() {
    if (this.searchText === '') {
      this.products = [...this.originalProducts];
    } else {
      this.products = this.originalProducts.filter((res) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.searchText.toLocaleLowerCase());
      });
    }
  }

  deleteItem(model: any, id: any) {
    this.modalService.open(model).result.then(
      (result) => {
        this.productService.delete(id).subscribe(
          (res) => {
            this.toastr.success('Item deleted successfuly ', 'Success', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
            this.getAllProduct();
          },
          (err) => {
            this.toastr.error(err.statusText, 'Error!', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
          }
        );
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
}
