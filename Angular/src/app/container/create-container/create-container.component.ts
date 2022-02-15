import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import {  FormControl,FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.css']
})
export class CreateContainerComponent implements OnInit {
  errormsg:any;
  successmsg:any;
  getparamid:any;
  readContainer:any;
  readDDCCFF:any;
  ddccff:any="";

  constructor(private service : AppServiceService,private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
  if(this.getparamid){
  this.service.getOneEmployee(this.getparamid).subscribe((res)=>{
    console.log(res, 'res==>');
    this.containerForm.patchValue({
      'container_cod': res.container[0].container_cod,
      'gpsLocation': res.container[0].gpsLocation,
      'adress' : res.container[0].adress,
      'ddccff' : res.ddccff[0].location

    });
  });
}

this.service.getContainer().subscribe((res)=>{
  console.log(res,"res==>");

  this.readContainer = res;
});

this.service.getDDCCFF().subscribe((res)=>{
  console.log(res,"res==>");

  this.readDDCCFF = res;
});
  }

containerForm = new FormGroup({

  'container_cod':new FormControl('',Validators.required),
  'gpsLocation':new FormControl('',Validators.required),
  'adress':new FormControl('',Validators.required),
  'ddccff':new FormControl('',Validators.required),

});

containerSubmit()
{
  if(this.containerForm.valid)
  {
  console.log(this.containerForm.value);

  this.service.createContainer(this.containerForm.value).subscribe((res)=>{
    console.log(res, 'res==>');
    this.containerForm.reset();
    this.successmsg = res.message;


          sessionStorage.setItem('permission', res.permission);
          sessionStorage.setItem('token',res.token)


          if(res.permission==='view'){
            this.router.navigate(['perfil']);


          }
          else if(res.permission==='viewEmployee'){

            this.router.navigate(['readCollection']);

          }
          else if((res.permission ==='edit')||(res.permission==='admin')){

            this.router.navigate(['readEmployee']);

          }

  });

  }
  else
  {
    this.errormsg = 'All field is required';
  }
}



containerUpdate()
{
  console.log(this.containerForm.value,'updatedForm');
  if(this.containerForm.valid)
  {
    this.service.updateContainer(this.containerForm.value, this.getparamid).subscribe((res)=>{
      console.log(res, 'resupdated');
      this.successmsg = res.message;
    })
  }else{
    this.errormsg = 'all field is required';
  }
}
}
