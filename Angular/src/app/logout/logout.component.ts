import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:AppServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.logout();

  }
}
