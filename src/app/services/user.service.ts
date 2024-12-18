import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public protocol: string = 'http';
  public path: string = 'localhost:3000';

  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(`${this.protocol}://${this.path}/api/user`).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    })
  }


}
