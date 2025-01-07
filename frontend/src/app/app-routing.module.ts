import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientTemplateComponent } from './template/client-template/client-template.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./authendication/auth-signin/auth-signin.component').then((m) => m.AuthSigninComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./authendication/auth-signup/auth-signup.component').then((m) => m.AuthSignupComponent),
      },
    ],
  },
  {
    path: '',
    component: ClientTemplateComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'client',
        loadComponent: () =>
          import('./pages/manage-users/manage-users.component').then((m) => m.ManageUsersComponent),
      },
      {
        path: 'client/add',
        loadComponent: () =>
          import('./pages/user-add/user-add.component').then((m) => m.UserAddComponent),
      },
      {
        path: 'client/edit/:id',
        loadComponent: () =>
          import('./pages/user-add/user-add.component').then((m) => m.UserAddComponent),
      },
      {
        path: 'role',
        loadComponent: () =>
          import('./pages/manage-role/manage-role.component').then((m) => m.ManageRoleComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
