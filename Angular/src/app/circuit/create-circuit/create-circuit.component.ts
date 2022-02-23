import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import {  FormControl,FormGroup, Validators} from '@angular/forms'
import { FormArray } from '@angular/forms';
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
  container1: any = "";
  container2: any = "";
  container3: any = "";
  container4: any = "";
  container5: any = "";
  container6: any = "";
  container7: any = "";
  container8: any = "";
  container9: any = "";
  container10: any = "";
  container11: any = "";
  container12: any = "";
  container13: any = "";
  container14: any = "";
  container15: any = "";
  container16: any = "";
  container17: any = "";
  container18: any = "";
  container19: any = "";
  container20: any = "";


  ngOnInit(): void {

  this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
  if(this.getparamid){
  this.service.getOneCircuit(this.getparamid).subscribe((res)=>{
    // console.log(res, 'res==>');
    this.circuitForm.patchValue({
      circuit_cod: res.circuit_cod,
      containers: res.containers,

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
  containers_data = new FormArray([]);



  circuitSubmit()
  {

    if(this.circuitForm.valid)
    {
    console.log(this.circuitForm.value);
    this.service.createCircuit({
      circuit_cod:this.circuitForm.value.circuit_cod,
      containers:this.containers_data.controls
    }).subscribe((res)=>{
      console.log(res, 'res==>');
      this.circuitForm.reset();
      this.successmsg = res.message;


    });

    }
    // else
    // {
    //   this.errormsg = 'All field is required';
    // }
  }


  addSkill(item:any) {
    this.containers_data.push(item);
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
