import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { TodoItemEditComponent } from './components/todo-item-edit/todo-item-edit.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'todo', component: TodoMainComponent },
  { path: 'todo/edit/:id', component: TodoItemEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
