import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from './../../../shared/services/products.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;
  submited: boolean = false;
  itemId: any;
  itemDetails: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imageUrl: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    public toastr: ToastrService
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
      imageUrl: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.productsService.getItem(this.itemId).subscribe((res: Product) => {
        this.itemDetails = res;
        console.log(this.itemDetails);
      });
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.editForm.invalid) {
      return;
    }
    

    this.productsService.update(this.editForm.value,this.itemId).subscribe(
      (res) => {
        console.log(res);

        this.toastr.success('Item Updated successfuly ', 'Success', {
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
