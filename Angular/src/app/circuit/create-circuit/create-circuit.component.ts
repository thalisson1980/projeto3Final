import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import {  FormControl,FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create-circuit',
  templateUrl: './create-circuit.component.html',
  styleUrls: ['./create-circuit.component.css']
})
export class CreateCircuitComponent implements OnInit {

  constructor(private service : AppServiceService,private router:Router, private activatedRoute: ActivatedRoute) { }
  errormsg:any;
  successmsg:any;
  getparamid:any;
  readContainer:any;
  readCircuit:any;

  ngOnInit(): void {

  this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
  if(this.getparamid){
  this.service.getOneContainer(this.getparamid).subscribe((res)=>{
    console.log(res, 'res==>');
    this.circuitForm.patchValue({
      circuit_cod: res.circuit[0].circuit_cod,
      containers: res.containers[0].adress,

    });
  });
}
this.service.getCircuit().subscribe((res)=>{
  console.log(res,"res==>");

  this.readCircuit = res;
});

this.service.getContainer().subscribe((res)=>{
  console.log(res,"res==>");

  this.readContainer = res;
});
}


circuitForm = new FormGroup({

    'circuit_cod':new FormControl('',Validators.required),
    'containers':new FormControl('',Validators.required),

  });

  circuitSubmit()
  {
    if(this.circuitForm.valid)
    {
    console.log(this.circuitForm.value);
    this.service.createCircuit(this.circuitForm.value).subscribe((res)=>{
      console.log(res, 'res==>');
      this.circuitForm.reset();
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



circuitUpdate()
  {
    console.log(this.circuitForm.value,'updatedForm');
    if(this.circuitForm.valid)
    {
      this.service.updateCircuit(this.circuitForm.value, this.getparamid).subscribe((res)=>{
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
