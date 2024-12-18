import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  response: string = '';
  users: any[]= [];

  constructor(private userService: UserService) {
    console.log(1);
  }

  ngOnInit(): void {
    console.log(2);
    
    this.loadUsers();

    console.log(3);


    fetch('http://localhost:3000/json')
      .then(res => res.json())
      .then((res: any) => {
        console.log(4);
        console.log(res);
        this.response = res.message;
      })
      .catch(err => console.log(err));
  }

  loadUsers(): void {
    console.log(5);
    this.userService.getAllUsers()
      .then((res: any) => {
        console.log(6);
        console.log(res);
        this.users = res;
      })
      .catch();

    console.log(7)
  }

}
