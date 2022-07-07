import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../interfaces/Task.interface';
import { map, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  isUpdated: Subject<boolean> = new Subject();
  
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>("https://todo-angular-f6450-default-rtdb.firebaseio.com/tasks.json").pipe(map(response => {
      const newArray: Task[] = [];
      for(let key in response) {
        if(response.hasOwnProperty(key)){
          newArray.push({ ...response[key], id: key })
        }
      }
      return newArray;
    }));
  }

  addTask(task: Task) {
    return this.http.post("https://todo-angular-f6450-default-rtdb.firebaseio.com/tasks.json", task).pipe(tap( ()=> {
      this.isUpdated.next(true);
    }));
  }

  deleteTask(id?: string) {
    this.isUpdated.next(true);
    return this.http.delete(`https://todo-angular-f6450-default-rtdb.firebaseio.com/tasks.json/{id}`);
  }

  getTask(id: string) {
  }
}