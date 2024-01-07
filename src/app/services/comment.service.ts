import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { enviroment } from '../../environment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  getComments(parentId: string = '') {
    let url = `${enviroment.apiBaseUrl}/comments`;
    if (parentId) {
      url += `?parentId=${parentId}`;
    }
    return this.http.get<Comment[]>(url);
  }


  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(`${enviroment.apiBaseUrl}/comments`, comment)
  }
}
