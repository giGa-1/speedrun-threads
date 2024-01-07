import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
})
export class CommentFormComponent {
  @Input() placeholder = 'Write soething...';
  @Input() buttonText = 'Create';
  @Output() formSubmitted = new EventEmitter<{
    text: string;
  }>();

  formSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const commentTextarea = form.elements.namedItem(
      'text'
    ) as HTMLTextAreaElement;
    const commentText = commentTextarea.value;
    form.reset();
    this.formSubmitted.emit({
      text: commentText,
    });
  }
}
