import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent {
  form: any = {
    title: null,
    category: null,
    priority: null,
    description: null,
    due_date: null
  };
  isSuccessful = false;
  isUpdateFailed = false;
  errorMessage = '';
  taskId: number;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    this.taskId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.taskService.getTask(this.taskId).subscribe(
      data => {
        this.form = data;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
  }

  onSubmit(): void {
    this.taskService.updateTask({ ...this.form, id: this.taskId }).subscribe(
      data => {
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    );
  }
}
