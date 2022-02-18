import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor(private service:AppServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.logout();

  }
}
