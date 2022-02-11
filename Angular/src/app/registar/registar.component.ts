import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent implements OnInit {

  constructor(private service:AppServiceService, private router: Router) { }

  errormsg:any;
  successmsg:any;
  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'name':new FormControl('', Validators.required),
    'email':new FormControl('', Validators.required),
    'password':new FormControl('', Validators.required),
    'passwordControl':new FormControl('', Validators.required)
  });

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


}
