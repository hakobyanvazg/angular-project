import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log(res);
          
          localStorage.setItem('access_token', res.access_token);
          if (res.role === 'admin') {
            this.router.navigate(['../admin']);
          } else {
            this.router.navigate(['../user']);
          }
        },
        (err) => {
          this.toastr.error(err.statusText, 'Error!', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
          this.loading = false;
        }
      );
  }
}
