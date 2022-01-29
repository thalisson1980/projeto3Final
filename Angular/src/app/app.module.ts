import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppServiceService } from './app-service.service';
import { RegistarComponent } from './registar/registar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistarComponent,
    PerfilComponent
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
