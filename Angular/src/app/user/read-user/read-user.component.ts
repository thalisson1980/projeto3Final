import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-read-user',
  templateUrl: './read-user.component.html',
  styleUrls: ['./read-user.component.css']
})
export class ReadUserComponent implements OnInit {
  readUser:any;
  errormsg:any;
  successmsg:any;
  readOneUser:any;

  constructor(private service:AppServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getUser().subscribe((res)=>{
      console.log(res,"res==>");

      this.readUser = res;
    });

}

getUserId(id:any)
{
  // console.log(id, 'resId==>');
 this.service.getOneUser(id).subscribe((res)=>{
  console.log(res.user, "res==>");
  this.successmsg = res.message;
  this.readUser = [res.user];

 });
}


deleteId(id:any)
{
  console.log(id, 'deleteid==>');
  this.service.deleteUser(id).subscribe((res)=>{
    console.log(res,'deleteres==>');
    this.successmsg = res.message;

    this.service.getUser().subscribe((res)=>{
      console.log(res,"res==>");
      this.readUser= res;
    });

  });


  }


  logout(){
    this.service.logout();

  }
}
