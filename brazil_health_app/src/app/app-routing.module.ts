import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { PacientDatasComponent } from './pages/pacient-datas/pacient-datas.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'auth/login', component: AuthComponent },
  {path: 'register/:role', component: RegisterComponent},
  {
    path: '',
    component: SidebarComponent,
    children: [
      {path: '', component: HomeComponent },
      {path: 'pacient', component: PacientDatasComponent},
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
