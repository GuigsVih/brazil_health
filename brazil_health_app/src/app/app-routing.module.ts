import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'auth/login', component: AuthComponent },
  {
    path: '',
    component: SidebarComponent,
    pathMatch: 'full',    
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
