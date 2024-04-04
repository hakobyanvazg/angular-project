import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

  constructor(private authServic:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authServic.logout()
    this.router.navigate(['/auth/login'])
  }
}
