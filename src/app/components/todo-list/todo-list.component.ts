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
    this.taskSerivce.getTasks().subscribe(response => {
      this.taskList = response;
    })
  }

  deleteItem(task: Task) {
    this.taskSerivce.deleteTask(task.id).subscribe(response => {
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
