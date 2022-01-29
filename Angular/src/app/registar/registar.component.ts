import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent implements OnInit {

  constructor(private service:AppServiceService) { }

  errormsg:any;
  successmsg:any;
  ngOnInit(): void {
  }

  userForm = new FormGroup({
    'nome':new FormControl('', Validators.required),
    'email':new FormControl('', Validators.required),
    'password':new FormControl('', Validators.required),
    'passwordControll':new FormControl('', Validators.required)
  });

  submit(){
    console.log(this.userForm.value)
    if(this.userForm.valid){
      if(this.userForm.value.password==this.userForm.value.passwordControll){
        this.service.criarUser(this.userForm.value).subscribe((res)=>{
          try{
            if(res.message.index==0){
              this.errormsg = 'This email already exists!';
              
            }
          }catch{
            this.userForm.reset();
            this.successmsg = 'Account created!'
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
