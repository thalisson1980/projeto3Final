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
          console.log(res)
          if(res.message=="sucesso"){
            this.successmsg="Login Success!";
            sessionStorage.setItem('email',this.userForm.value.email);
            sessionStorage.setItem('permission', res.permission);
            sessionStorage.setItem('token',res.token)
            //this.router.navigate(['perfil']);
            if(res.permission==='view'){
              this.router.navigate(['menuUser']);


            }
            else if(res.permission==='viewEmployee'){

              this.router.navigate(['menuEmployee']);

            }
            else if(res.permission ==='edit'){

              this.router.navigate(['manager']);

            }
            else if(res.permission ==='admin'){
              this.router.navigate(['admin']);
            }



          }
          if(res.error=="User not found"){
            this.errormsg="This email is not valid";
          }
          if(res.error=="Invalid password"){
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
