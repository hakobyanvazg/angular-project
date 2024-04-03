import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../shared/services/products.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {
  products: Product[] = [];
  lastProductId: number | undefined = 0;
  addForm: FormGroup;
  submited: boolean = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.addForm = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
      if (this.products.length > 0) {
        this.lastProductId = this.products[this.products.length - 1].id;
        console.log('Last Product ID:', this.lastProductId);
      }
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.addForm.invalid) {
      return;
    }
    const newProductId =
      this.lastProductId !== undefined
        ? (Number(this.lastProductId) + 1).toString()
        : '1';

    // Set the ID in the form value
    this.addForm.patchValue({ id: newProductId });

    console.log(this.addForm.value);

    this.productService.add(this.addForm.value).subscribe(
      (res) => {
        console.log(res);

        this.toastr.success('Item Add successfuly ', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
        this.router.navigate(['../admin/products']);
      },
      (err) => {
        this.toastr.error(err.statusText, 'Error!', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
      }
    );
  }
}
