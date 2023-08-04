import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'enquiry',
    loadChildren: () => import('./Pages/enquiry/enquiry.module').then( m => m.EnquiryPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./Pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./Pages/orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
