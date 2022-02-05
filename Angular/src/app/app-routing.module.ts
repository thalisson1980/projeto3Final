import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ReadEmployeeComponent } from './read-employee/read-employee.component';
import { ReadCircuitComponent } from './read-circuit/read-circuit.component';
import { ReadContainerComponent } from './read-container/read-container.component';
import { CompararComponent } from './comparar/comparar.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'registar', component:RegistarComponent},
  {path: 'perfil',component:PerfilComponent},
  {path: 'create-employee', component:CreateEmployeeComponent},
  {path: 'read-employee', component:ReadEmployeeComponent},
  {path: 'read-circuit', component:ReadCircuitComponent},
  {path: 'read-container', component:ReadContainerComponent},
  {path: 'comparar',component:CompararComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
