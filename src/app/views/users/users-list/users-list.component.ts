import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.authService.getAllUser().subscribe((res) => {
      this.users = res;
    });
  }

  deleteItem(model: any, id: any) {
    this.modalService.open(model).result.then(
      (result) => {
        this.authService.deleteUser(id).subscribe(
          (res) => {
            this.toastr.success('Item deleted successfuly ', 'Success', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
            this.getAllUsers();
          },
          (err) => {
            this.toastr.error(err.statusText, 'Error!', {
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
            });
          }
        );
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
}
