import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  navItems: { name: string; url: string; iconClass: string }[] = [
    { name: 'Dashboard', url: '../admin/dashboard', iconClass: 'fa fa-home' },
    { name: 'Users', url: '../admin/users', iconClass: 'fa fa-users' },
    {
      name: 'Products',
      url: '../admin/products',
      iconClass: 'fa fa-shopping-cart',
    },
  ];
  searchText: string = '';
  currentRoute: string = '';
  users: User[] = [];
  products: Product[] = [];
  originalProducts: Product[] = [];
  originalUsers: User[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getProducts();
    this.router.events.subscribe((event) => {
      // Check if it's a NavigationEnd event to get the current route
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        console.log('Current route:', this.currentRoute);
      }
    });
  }

  getUsers() {
    this.authService.getAllUser().subscribe((data: User[]) => {
      this.users = data;
      this.originalUsers = [...data];
    });
  }



  getProducts() {
    this.productService.getAll().subscribe((data: Product[]) => {
      this.products = data;
      this.originalProducts = [...data];
    });
  }


  Search() {
    if (this.currentRoute === '/admin/users') {
      if (this.searchText === '') {
        this.users = [...this.originalUsers];
      } else {
        this.users = this.originalUsers.filter((res) => {
          return res.firstName
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      }
    }

    if (this.currentRoute === '/admin/products') {
      if (this.searchText === '') {
        this.products = [...this.originalProducts];
      } else {
        this.products = this.originalProducts.filter((res) => {
          return res.name.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
