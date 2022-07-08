import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formError: boolean = false;

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
    if(!this.editTaskForm.valid){
      return;
    }
    const editedTask: Task = {
      id: this.taskId,
      taskname: this.editTaskForm.get('task')?.value,
      date: this.editTaskForm.get('date')?.value,
      important: this.editTaskForm.get('important')?.value === true ? true : false
    }

    this.taskService.editTask(editedTask).subscribe(response => {
      console.log(response);
    })

    this.router.navigate(['/todo']);
  }

  initializeForm() {
      this.editTaskForm = new FormGroup({
      'task': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'important': new FormControl(null)
    });
  }

  setDataInForm() {
    this.editTaskForm.get('task')?.setValue(this.task.taskname);
    this.editTaskForm.get('date')?.setValue(this.task.date);
    this.editTaskForm.get('important')?.setValue(this.task.important);
  }

}
