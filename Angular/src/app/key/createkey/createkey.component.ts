import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-createkey',
  templateUrl: './createkey.component.html',
  styleUrls: ['./createkey.component.css']
})
export class CreatekeyComponent implements OnInit {

  constructor(private service:AppServiceService,private router: Router, private activatedRoute: ActivatedRoute) { }
  errormsg:any;
  successmsg:any;
  getparamid:any;
  readKey:any;
  readKeyReq:any;

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.getparamid){
    this.service.getOneKey(this.getparamid).subscribe((res)=>{
      console.log(res, 'res==>');
      // console.log('res',res.key.name)
      this.keyForm.patchValue({
        startDate: res.key[0].startDate.name,
        endDate: res.key[0].endDate,
        status: res.pedidos[0].keyRequest.state
      });
    });
  }


this.service.getKey().subscribe((res)=>{
    console.log(res,"res==>");

    this.readKey = res;
  });

  this.service.getKeyRequests().subscribe((res)=>{
    console.log(res,"res==>");

    this.readKeyReq = res;
  });

  }

  keyForm = new FormGroup({
    // '_id':new FormControl('',Validators.required),
    'startDate':new FormControl('',Validators.required),
    'endDate':new FormControl('',Validators.required),
    'dateStartTime':new FormControl('',Validators.required),
    'status': new FormControl('',Validators.required),
  });


 keySubmit()
  {
  if(this.keyForm.valid)
  {
  console.log(this.keyForm.value);

  this.service.createKey(this.keyForm.value).subscribe((res)=>{
    console.log(res, 'res==>');
    this.keyForm.reset();
    this.successmsg = res.message;


  });

  }

}

keyUpdate()
{
  console.log(this.keyForm.value,'updatedForm');
  if(this.keyForm.valid)
  {
    this.service.updateKey(this.keyForm.value, this.getparamid).subscribe((res)=>{
      console.log(res, 'resupdated');
      this.successmsg = res.message;
    })
  }else{
    this.errormsg = 'all field is required';
  }
}


  logout(){
    this.service.logout();

  }
}
