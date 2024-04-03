import { AbstractControl, FormControl } from "@angular/forms";

export interface Product {
    id?: number;
    name: string;
    price: number;
    description:string;
    imageUrl:string
}

export type ProductForm = {
    [key in keyof Omit<Product, 'id'>]: FormControl<key extends 'price' ? number : string>;
  };