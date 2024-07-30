import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  form: any = {
    title: null,
    category: null,
    priority: null,
    description: null,
    due_date: null
  };
  isSuccessful = false;
  isCreationFailed = false;
  errorMessage = '';

  constructor(private taskService: TaskService) { }

  onSubmit(): void {
    const { title, category, priority, description, due_date } = this.form;

    this.taskService.createTask({ title, category, priority, description, due_date }).subscribe(
      data => {
        this.isSuccessful = true;
        this.isCreationFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isCreationFailed = true;
      }
    );
  }
}
