import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/Task.interface';

@Component({
  selector: 'app-todo-item-edit',
  templateUrl: './todo-item-edit.component.html',
  styleUrls: ['./todo-item-edit.component.scss']
})
export class TodoItemEditComponent implements OnInit {
  task!: Task;
  editTaskForm!: FormGroup;
  taskId!: string;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.taskId = this.route.snapshot.params['id'];
    this.taskService.getTask(this.taskId).subscribe(response => {
      this.task = response;
      this.setDataInForm();
    });
  }

  onSubmit() {
    const editedTask: Task = {
      id: this.task.id,
      taskname: this.editTaskForm.get('task')?.value,
      date: this.editTaskForm.get('date')?.value,
      important: this.editTaskForm.get('important')?.value
    }

    this.taskService.editTask(editedTask).subscribe(response => {
      console.log(response);
    })

    this.router.navigate(['/todo']);
  }

  initializeForm() {
      this.editTaskForm = new FormGroup({
      'task': new FormControl(null),
      'date': new FormControl(null),
      'important': new FormControl(null)
    });
  }

  setDataInForm() {
    this.editTaskForm.get('task')?.setValue(this.task.taskname);
    this.editTaskForm.get('date')?.setValue(this.task.date);
    this.editTaskForm.get('important')?.setValue(this.task.important);
  }

}
