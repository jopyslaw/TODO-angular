import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      'task': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'important': new FormControl(null)
    })
  }

  onSubmit() {
    if(!this.taskForm.valid){
      return;
    }
    const newTask: Task = {
      taskname: this.taskForm.get('task')?.value,
      date: this.taskForm.get('date')?.value,
      important: this.taskForm.get('important')?.value === true ? true : false
    }
    this.taskService.addTask(newTask).subscribe(response => {
      console.log(response);
    }, (error) => {
      console.log(error)
      this.error = true;
    })
    this.taskForm.reset();
  }

}
