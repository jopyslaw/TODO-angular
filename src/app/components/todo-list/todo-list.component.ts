import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interfaces/Task.interface';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  taskList!: Task[];
  listSubscription!: Subscription;
  listLoading: boolean = false;

  constructor(private taskSerivce: TaskServiceService) { }

  ngOnInit(): void {
    this.getTasks();

    this.listSubscription = this.taskSerivce.isUpdated.subscribe(response => {
      if(response === true) {
        this.getTasks();
      }
    })
  }

  getTasks() {
    this.listLoading = true;
    this.taskSerivce.getTasks().subscribe(response => {
      this.listLoading = false;
      this.taskList = response;
    })
  }

  deleteAll() {
    this.taskSerivce.deleteAllTasks().subscribe(response => {
      console.log(response);
    })
  }

  deleteOneTask(task: Task) {
    this.taskSerivce.deleteTask(task.id).subscribe(response => {
      console.log(response);
    })
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
