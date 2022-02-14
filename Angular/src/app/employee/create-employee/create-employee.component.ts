
import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'
import {  FormControl,FormGroup, Validators} from '@angular/forms'


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private service : AppServiceService, private router: Router, private activatedRoute: ActivatedRoute ) { }
  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.getparamid){
    this.service.getOneEmployee(this.getparamid).subscribe((res)=>{
      // console.log(res, 'res==>');
      console.log('res',res.employee.name)
      this.employeeForm.patchValue({
        name: res.employee.name,
        adress: res.employee.adress,
        postalCode: res.employee.postalCode,
        occupation: res.employee.occupation,
        permission: res.employee.permission,
        ativo:res.employee.ativo
      });
    });
  }
}
  employeeForm = new FormGroup({
    // '_id':new FormControl('',Validators.required),
    'name':new FormControl('',Validators.required),
    'adress':new FormControl('',Validators.required),
    'postalCode':new FormControl('',Validators.required),
    'occupation':new FormControl('',Validators.required),
    'ativo':new FormControl('',Validators.required),
  });


  employeeSubmit()
  {
    if(this.employeeForm.valid)
    {
    console.log(this.employeeForm.value);

    this.service.createEmployee(this.employeeForm.value).subscribe((res)=>{
      console.log(res, 'res==>');
      this.employeeForm.reset();
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

  employeeUpdate()
  {
    console.log(this.employeeForm.value,'updatedForm');
    if(this.employeeForm.valid)
    {
      this.service.updateEmployee(this.employeeForm.value, this.getparamid).subscribe((res)=>{
        console.log(res, 'resupdated');
        this.successmsg = res.message;
      })
    }else{
      this.errormsg = 'all field is required';
    }
  }
}
