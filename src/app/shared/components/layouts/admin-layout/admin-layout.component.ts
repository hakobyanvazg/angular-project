import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
