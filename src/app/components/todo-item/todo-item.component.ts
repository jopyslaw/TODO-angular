import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() task!: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
