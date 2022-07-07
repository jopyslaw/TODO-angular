import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskServiceService } from 'src/app/services/task-service.service';
import { Task } from 'src/app/interfaces/Task.interface';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-todo-main',
  templateUrl: './todo-main.component.html',
  styleUrls: ['./todo-main.component.scss']
})
export class TodoMainComponent implements OnInit {
  taskForm!: FormGroup;
  error: boolean = false;

  constructor(private taskService: TaskServiceService) { }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      'task': new FormControl(null),
      'date': new FormControl(null),
      'important': new FormControl(null)
    })
  }

  onSubmit() {
    console.log(this.taskForm);
    const newTask: Task = {
      taskname: this.taskForm.get('task')?.value,
      date: this.taskForm.get('date')?.value,
      important: this.taskForm.get('important')?.value
    }
    this.taskService.addTask(newTask).subscribe(response => {
      console.log(response);
    }, (error) => {
      console.log(error)
      this.error = true;
    })
    //this.taskForm.reset();
  }

}
