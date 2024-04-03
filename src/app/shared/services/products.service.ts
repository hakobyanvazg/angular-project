import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNzEyMTA0NDQxLCJleHAiOjE3MTIxMDgwNDF9.w_jTNwOm1oCTI90S1cn4f9Yk5_7DzvLcLjWDuG4T8Qo`,
    }),
  };
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${environment.apiUrl}/products`,
      this.httpOptions
    );
  }

  delete(id: any): Observable<Product[]> {
    return this.http.delete<Product[]>(
      `${environment.apiUrl}/products/${id}`,
      this.httpOptions
    );
  }

  add(data: Product) {
    return this.http.post(`${environment.apiUrl}/products`,data, this.httpOptions);
  }
}
