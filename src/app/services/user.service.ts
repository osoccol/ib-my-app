import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.http.get<User[]>(
        `${environment.protocol}://${environment.path}/api/user`
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
      this.http.delete(`${environment.protocol}://${environment.path}/api/user/${id}`).subscribe(
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
      this.http.post(`${environment.protocol}://${environment.path}/api/user`, user).subscribe(
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
      this.http.put(`${environment.protocol}://${environment.path}/api/user/${user._id}`, user).subscribe(
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
