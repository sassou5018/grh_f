import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { authGuard } from './guards/authguard/auth.guard';
import { CollabformComponent } from './components/collabform/collabform.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path:"", component: AppLayoutComponent, canActivate: [authGuard], children:[
    {path: "", component: DashboardComponent},
    {path: "addcollab", component: CollabformComponent}
  ]},
  {path: "auth", loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
