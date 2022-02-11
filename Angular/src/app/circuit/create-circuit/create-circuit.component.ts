import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import {  FormControl,FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-create-circuit',
  templateUrl: './create-circuit.component.html',
  styleUrls: ['./create-circuit.component.css']
})
export class CreateCircuitComponent implements OnInit {

  constructor(private service : AppServiceService,private router:Router) { }
  errormsg:any;
  successmsg:any;

  ngOnInit(): void {
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


            localStorage.setItem('permission', res.permission);
            localStorage.setItem('token',res.token)


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
}


