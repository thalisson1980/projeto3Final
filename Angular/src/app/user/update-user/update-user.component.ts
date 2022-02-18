import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  errormsg:any;
  successmsg:any;
  getparamid:any;

  constructor(private service:AppServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.getparamid){
    this.service.getOneUser(this.getparamid).subscribe((res)=>{
      console.log(res, 'res==>');
      this.uptadeForm.patchValue({
        // name: res.user[0].name,
        // email: res.user[0].email,
        // password: res.user[0].password,
        // passwordControl: res.user[0].passwordControl
        key: res.user[0].key,
        permission: res.user[0].permission
      });
    });
  }
  }

 uptadeForm = new FormGroup({

    'key':new FormControl('', Validators.required),
    'permission':new FormControl('', Validators.required),

  });
}
