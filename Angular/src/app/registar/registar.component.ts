import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent implements OnInit {

  errormsg:any;
  successmsg:any;
  getparamid:any;

  constructor(private service:AppServiceService, private router: Router, private activatedRoute: ActivatedRoute ) { }


  ngOnInit(): void {

    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.getparamid){
    this.service.getOneUser(this.getparamid).subscribe((res)=>{
      console.log(res, 'res==>');
      this.userForm.patchValue({
        name: res.user.name,
        email: res.user.email,
        password: res.user.password,
        passwordControl: res.user.passwordControl
        // key: res.user[0].key,
        // permission: res.user[0].permission
      });
    });
  }
  }

  userForm = new FormGroup({
    'name':new FormControl('', Validators.required),
    'email':new FormControl('', Validators.required),
    'password':new FormControl('', Validators.required),
    'passwordControl':new FormControl('', Validators.required)

    // 'passwordControl':new FormControl('', Validators.required)
  });

  // uptadeForm = new FormGroup({
  //   'name':new FormControl('', Validators.required),
  //   'email':new FormControl('', Validators.required),
  //   'password':new FormControl('', Validators.required),
  //   'key':new FormControl('', Validators.required),
  //   'permission':new FormControl('', Validators.required),

  // });

  submit(){
    console.log(this.userForm.value)
    if(this.userForm.valid){
      if(this.userForm.value.password==this.userForm.value.passwordControl){
        this.service.criarUser(this.userForm.value).subscribe((res)=>{
         if(res.error =='User already exists'){
              this.errormsg = 'This email already exists!';

          }
          if(res.user){
            this.userForm.reset();
            this.successmsg = 'Account created!'
            sessionStorage.setItem('email',res.user.email);
            sessionStorage.setItem('token',res.token);
            this.router.navigate(['menuUser']);

          }



        })
      }else{
        this.errormsg = 'Passwords must match!';
      }
    }else{
      this.errormsg = 'Fill every parameter!';
    }

  }


  userUpdate()
  {
    console.log(this.userForm.value,'updatedForm');
    if(this.userForm.valid)
    {
      this.service.updateUser(this.userForm.value, this.getparamid).subscribe((res)=>{
        console.log(res, 'resupdated');
        this.successmsg = res.message;
      })
    }else{
      this.errormsg = 'all field is required';
    }
  }


}
