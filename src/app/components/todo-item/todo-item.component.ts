import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/interfaces/Task.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() deleteEmitter: EventEmitter<Task> = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onDelete(task: Task) {
    this.deleteEmitter.emit(task);
  }

  onEdit() {
    this.router.navigate(['edit', this.task.id], { relativeTo: this.route });
  }
}
