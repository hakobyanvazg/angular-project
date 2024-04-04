import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/products`
      
    );
  }

  delete(id: any): Observable<Product[]> {
    return this.http.delete<Product[]>(
      `${environment.apiUrl}/products/${id}`
      
    );
  }

  add(data: Product) {
    return this.http.post(
      `${environment.apiUrl}/products`,
      data
      
    );
  }

  getItem(id:any) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  update(data: Product, id: any) {
    return this.http.put(
      `${environment.apiUrl}/products/${id}`,
      data
      
    );
  }
}
