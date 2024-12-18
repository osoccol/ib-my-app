import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getCommentsFromEmail(email: string): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Comment[]>(`${environment.protocol}://${environment.path}/api/comment/email/${email}`).subscribe(
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
