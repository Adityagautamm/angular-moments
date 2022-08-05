import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateMemoryComponent } from './components/create-memory/create-memory.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './shared/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'createpost',
    component: CreateMemoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
