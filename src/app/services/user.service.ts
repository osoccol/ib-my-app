import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public protocol: string = 'http';
  public path: string = 'localhost:3000';

  constructor(private http: HttpClient) {
    console.log('service construit')
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.protocol}://${this.path}/api/user`).subscribe(
        (data: any) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      )
    })
  }


}
