import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  response: string = '';

  constructor() { }

  ngOnInit(): void {
    fetch('http://localhost:3000/json')
      .then(res => res.json())
      .then((res: any) => {
        console.log(res);
        this.response = res.message;
      })
      .catch(err => console.log(err));
  }

}
