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
      this.http.get<User[]>(
        `${this.protocol}://${this.path}/api/user`
      ).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  deleteUserById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.protocol}://${this.path}/api/user/${id}`).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    })
  }

  createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.protocol}://${this.path}/api/user`, user).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  updateUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.protocol}://${this.path}/api/user/${user._id}`, user).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }


}
