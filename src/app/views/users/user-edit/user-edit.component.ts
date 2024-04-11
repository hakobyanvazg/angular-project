import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  editUserForm: FormGroup;
  submited: boolean = false;
  itemId: any;
  itemDetails: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public toastr: ToastrService
  ) {
    this.editUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
      this.authService.getItem(this.itemId).subscribe((res: User) => {
        this.itemDetails = res;
        console.log(this.itemDetails);
      });
    });
  }

  onSubmit() {
    this.submited = true;
    if (this.editUserForm.invalid) {
      return;
    }
    

    this.authService.update(this.editUserForm.value,this.itemId).subscribe(
      (res) => {
        console.log(res);

        this.toastr.success('Item Updated successfuly ', 'Success', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
        });
        this.router.navigate(['../admin/users']);
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
