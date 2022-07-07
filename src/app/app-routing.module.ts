import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { TodoMainComponent } from './components/todo-main/todo-main.component';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'todo', component: TodoMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
