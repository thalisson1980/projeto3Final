import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-read-employee',
  templateUrl: './read-employee.component.html',
  styleUrls: ['./read-employee.component.css']
})
export class ReadEmployeeComponent implements OnInit {
  readEmployee:any;
  successmsg:any;
  readOneEmployee:any;

  getparamid:any
  constructor(private service : AppServiceService,private Router:Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
  this.service.getEmployee().subscribe((res)=>{
    console.log(res,"res==>");

    this.readEmployee = res;
  });


}

getEmployeeId(id:any)
{
  // console.log(id, 'resId==>');
 this.service.getOneEmployee(id).subscribe((res)=>{
   this.successmsg = res.message;
   this.readEmployee=[res.employee]
   console.log(res.employee, "res==>");


 });
}


deleteID(id:any)
{
  console.log(id, 'deleteid==>');
  this.service.deleteEmployee(id).subscribe((res)=>{
    console.log(res,'deleteres==>');
    this.successmsg = res.message;
    if(res.error){
      this.successmsg=res.error
    }
  });

    this.service.getEmployee().subscribe((res)=>{
      console.log(res,"res==>");
      this.readEmployee= res;

  });
}



}
