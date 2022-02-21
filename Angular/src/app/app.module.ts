import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppServiceService } from './app-service.service';
import { RegistarComponent } from './registar/registar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { ReadEmployeeComponent } from './employee/read-employee/read-employee.component';
import { ReadCircuitComponent } from './circuit/read-circuit/read-circuit.component';
import { CreateCircuitComponent } from './circuit/create-circuit/create-circuit.component';
import { CreateContainerComponent } from './container/create-container/create-container.component';
import { CreateCollectionComponent } from './collection/create-collection/create-collection.component';
import { ReadCollectionComponent } from './collection/read-collection/read-collection.component';
import { AdminComponent } from './menuAdmin/admin/admin.component';
import { ManagerComponent } from './menuManager/manager/manager.component';
import { MenuEmployeeComponent } from './menuEmployee/menu-employee/menu-employee.component';
import { MenuUserComponent } from './menuUser/menu-user/menu-user.component';
import { ReadUserComponent } from './user/read-user/read-user.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CompararComponent } from './comparar/comparar.component';
import { ReadAnonimoComponent } from './collection/read-anonimo/read-anonimo.component';
import { ReadOneCollectionComponent } from './collection/read-one-collection/read-one-collection.component';
import { ReadOneCircuitComponent } from './circuit/read-one-circuit/read-one-circuit.component';
import { BioPontosComponent } from './circuit/bio-pontos/bio-pontos.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ReadOneUserComponent } from './user/read-one-user/read-one-user.component';
import { KeyRequestsComponent } from './key-requests/key-requests.component';
import { ReadOneColletionCircuitComponent } from './circuit/read-one-colletion-circuit/read-one-colletion-circuit.component';








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistarComponent,
    PerfilComponent,
    CreateEmployeeComponent,
    ReadEmployeeComponent,
    ReadCircuitComponent,
    CreateCircuitComponent,
    CreateContainerComponent,
    CreateCollectionComponent,
    ReadCollectionComponent,
    AdminComponent,
    ManagerComponent,
    MenuEmployeeComponent,
    MenuUserComponent,
    ReadUserComponent,
    MenuPrincipalComponent,
    CompararComponent,
    ReadAnonimoComponent,
    ReadOneCollectionComponent,
    ReadOneCircuitComponent,
    BioPontosComponent,
    LogoutComponent,
    UpdateUserComponent,
    ReadOneUserComponent,
    KeyRequestsComponent,
    ReadOneColletionCircuitComponent,



    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
