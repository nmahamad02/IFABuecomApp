import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*{
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },*/
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'mis',
    loadChildren: () => import('./modules/mis/mis.module').then(m => m.MisModule)
  },
  {
    path: 'hrms',
    loadChildren: () => import('./modules/hrms/hrms.module').then(m => m.HrmsModule)
  },
  {
    path: 'crm',
    loadChildren: () => import('./modules/crm/crm.module').then(m => m.CrmModule)
  },
  {
    path: 'scm',
    loadChildren: () => import('./modules/scm/scm.module').then(m => m.ScmModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'ic',
    loadChildren: () => import('./modules/ic/ic.module').then(m => m.IcModule)
  },
  { 
    path: '**', //If path doesn't match anything reroute to /authentication/signin
    redirectTo: '/home/dashboard', 
    pathMatch: 'full' 
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
