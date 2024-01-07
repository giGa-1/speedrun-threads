import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { Comment } from '../interfaces/comment.interface';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  commentService = inject(CommentService);
  comments = signal<Comment[]>([]);
  userService = inject(UserService);

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments);
    });
  }

  createComment({text}: {text: string}) {
    const user = this.userService.getUserFromStorage();
    if( !user) {
      return
    }
    this.commentService.createComment({text, userId:user?._id}).subscribe(createdComment => {
      this.comments.set([createdComment, ...this.comments()])
    });
  }


  trackById(comment: Comment) {
    return comment._id
  }
}
