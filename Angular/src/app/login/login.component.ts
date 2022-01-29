import { ApplicationModule, Component, OnInit } from '@angular/core';
import { AppServiceService} from '../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:AppServiceService,private router: Router) { }

  errormsg:any;
  successmsg:any;
  ngOnInit(): void {
  
  }

  userForm = new FormGroup({
    
    'email':new FormControl('', Validators.required),
    'password':new FormControl('', Validators.required)
   
  });


  submit(){
    if(this.userForm.valid){
      
        this.service.login(this.userForm.value).subscribe((res)=>{
        
          if(res.message=="sucesso"){
            this.successmsg="Login Success!";
            localStorage.setItem('email',this.userForm.value.email);
            this.router.navigate(['perfil']);
          }
          if(res.message=="email nao existe"){
            this.errormsg="This email is not valid";
          }
          if(res.message=="password incorreta"){
            this.errormsg="Incorrect Password";
            console.log(res)
          }
          
        })
      }
    else{
      this.errormsg = 'Fill every parameter!';
    }
    
  }
}
