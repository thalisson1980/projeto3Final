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




    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AppServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
