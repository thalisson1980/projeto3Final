import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'Angular';

  constructor (private service : AppServiceService,private Router:Router){

  }

  ngOnInit(){

  }


}
