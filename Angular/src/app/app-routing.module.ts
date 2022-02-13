import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistarComponent } from './registar/registar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CreateCircuitComponent } from './circuit/create-circuit/create-circuit.component';
import { ReadCircuitComponent } from './circuit/read-circuit/read-circuit.component';
import { CreateCollectionComponent } from './collection/create-collection/create-collection.component';
import { ReadCollectionComponent } from './collection/read-collection/read-collection.component';
import { CreateContainerComponent } from './container/create-container/create-container.component';
import { ReadContainerComponent } from './container/read-container/read-container.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ReadEmployeeComponent } from './employee/read-employee/read-employee.component';
import { AdminComponent } from './menuAdmin/admin/admin.component';
import { ManagerComponent } from './menuManager/manager/manager.component';
import { MenuEmployeeComponent } from './menuEmployee/menu-employee/menu-employee.component';
import { MenuUserComponent } from './menuUser/menu-user/menu-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ReadUserComponent } from './user/read-user/read-user.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CompararComponent } from './comparar/comparar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadAnonimoComponent } from './collection/read-anonimo/read-anonimo.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'registar', component:RegistarComponent},
  {path: 'perfil',component:PerfilComponent},
  {path: 'createCircuit', component:CreateCircuitComponent},
  {path: 'readCircuit', component:ReadCircuitComponent},
  {path: 'createCollection', component:CreateCollectionComponent},
  {path: 'readCollection', component:ReadCollectionComponent},
  {path: 'createContainer', component:CreateContainerComponent},
  {path: 'readContainer', component:ReadContainerComponent},
  {path: 'createEmployee', component:CreateEmployeeComponent},
  {path: 'readEmployee', component:ReadEmployeeComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'manager', component:ManagerComponent},
  {path: 'menuEmployee', component:MenuEmployeeComponent},
  {path: 'menuUser', component:MenuUserComponent},
  {path: 'createUser', component:CreateUserComponent},
  {path: 'readUser', component:ReadUserComponent},
  {path: '', component:MenuPrincipalComponent},
  {path: 'comparar',component:CompararComponent},
  {path: 'readAnonimo', component:ReadAnonimoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
