import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {
  read:any;

  constructor(private service : AppServiceService,private Router:Router) { }

  ngOnInit(): void {
    this.service.getEmployee().subscribe((res)=>{
      console.log(res,"res==>");

      this.read = res;
    });
  }

}
