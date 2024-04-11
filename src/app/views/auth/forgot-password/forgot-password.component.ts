import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotpassForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.forgotpassForm = new FormGroup({
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
    console.log(this.forgotpassForm.value);

    if (this.forgotpassForm.invalid) {
      return;
    }

    this.authService
      .forgotPass(this.forgotpassForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          
        },
        (err) => {
          this.toastr.error(err.statusText, 'Error!', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
        }
      );
      this.router.navigate(['auth/login'])
  }
}
