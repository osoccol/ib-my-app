import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  comments: Comment[] = [];
  updateMode: boolean = false;
  asc: boolean = true;

  search: string = '';

  _id: string = '';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private commentService: CommentService) { }

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

  loadComments(user: User): void {
    this.commentService.getCommentsFromEmail(user.email)
      .then((comments) => {
        this.comments = comments;
      })
      .catch(err => console.log(err));
  }

  updateUser(user: User): void {
    this.updateMode = true;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this._id = user._id;
  }

  deleteUser(user: User): void {
    this.userService.deleteUserById(user._id)
      .then(() => {
        this.loadUsers();
      })
      .catch(err => console.log(err));
  }

  sortComments() {
    this.comments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (this.asc) {
      this.comments.reverse();
    } 
    this.asc = !this.asc;
  }

  filterComments() {
    this.comments = this.comments.filter(el => el.text.includes(this.search));
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
