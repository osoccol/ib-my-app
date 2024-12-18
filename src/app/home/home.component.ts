import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  updateMode: boolean = false;

  _id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers()
      .then((users) => {
        this.users = users;
      })
      .catch(err => console.log(err));
  }

  updateUser(user: User) {
    this.updateMode = true;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this._id = user._id;
  }

  deleteUser(user: User) {
    this.userService.deleteUserById(user._id)
      .then(() => {
        this.loadUsers();
      })
      .catch(err => console.log(err));
  }

  saveUser(event: any) {
    event.preventDefault();
    const user = new User(this.name, this.email, this.password);
   
    if (this.updateMode == true) {
      user._id = this._id;
      this.userService.updateUser(user).then(() => {
        this.loadUsers();
        this.resetForm();
      })
      .catch(err => console.log(err));
    } else {
      this.userService.createUser(user).then(() => {
        this.loadUsers();
        this.resetForm();
      })
      .catch(err => console.log(err));
    }
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.updateMode = false;
  }
}
