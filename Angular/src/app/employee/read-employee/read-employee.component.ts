import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {
  readEmployee:any;
  successmsg:any;

  constructor(private service : AppServiceService,private Router:Router) { }

  ngOnInit(): void {
  this.service.getEmployee().subscribe((res)=>{
    console.log(res,"res==>");

    this.readEmployee = res;
  });
}


deleteID(id:any)
{
  console.log(id, 'deleteid==>');
  this.service.deleteEmployee(id).subscribe((res)=>{
    console.log(res,'deleteres==>');
    this.successmsg = res.message;

  })
}

}
