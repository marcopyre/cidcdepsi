import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { isAdminGuard } from '../shared/guard/admin.guard';
import { SearchPageComponent } from './seach-page/search-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login/succes/:id', component: LoginPageComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'back-office', canActivate: [isAdminGuard], component: AdminPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
