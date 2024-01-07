import { Component, Input, effect, inject, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { Comment } from '../../interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentFormComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpended = signal(false);
  isReplying = signal(false);
  commentService = inject(CommentService);
  nestedComments = signal<Comment[]>([]);
  userService = inject(UserService);

  nestedCommentsEffect = effect(() => {
    if (this.isExpended()) {
      this.commentService
        .getComments(this.comment._id)
        .subscribe((comments) => {
          this.nestedComments.set(comments);
        });
    }
  });

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpended.set(true);
    }
  }

  toggleExpanded() {
    this.isExpended.set(!this.isExpended());
  }

  createComment({ text }: { text: string }) {
    const user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService
      .createComment({ text, userId: user?._id, parentId: this.comment._id})
      .subscribe((createdComment) => {
        this.nestedComments.set([createdComment, ...this.nestedComments()]);
      });
  }
}
