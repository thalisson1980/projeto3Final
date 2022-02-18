import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-menu-employee',
  templateUrl: './menu-employee.component.html',
  styleUrls: ['./menu-employee.component.css']
})
export class MenuEmployeeComponent implements OnInit {

  constructor(private service:AppServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.logout();

  }
}
