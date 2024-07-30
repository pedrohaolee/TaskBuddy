import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post(API_URL + 'tasks/', task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.patch(API_URL + 'tasks/' + task.id + '/', task);
  }

  getTasks(): Observable<any> {
    return this.http.get(API_URL + 'tasks/');
  }
}
