import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup({
      id: new FormControl('0'),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return
    }
    this.loading = true;
    

    this.authService
      .register(this.signupForm.value)
      .pipe(first())
      .subscribe(
        (res) => {
          console.log(res);

          this.toastr.success('Signup successfuly ', 'Success', {
            timeOut: 3000,
            closeButton: true,
            progressBar: true,
          });
          this.router.navigate(['../auth/login']);
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
