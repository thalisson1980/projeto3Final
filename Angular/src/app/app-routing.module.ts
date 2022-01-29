import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'registar', component:RegistarComponent},
  {path: 'perfil',component:PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
