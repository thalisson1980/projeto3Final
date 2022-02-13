import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AppServiceService } from '../../app-service.service';
@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  constructor(private service:AppServiceService) { }

  ngOnInit(): void {
  }
  errormsg:any;
  mensagem:any;

  userForm = new FormGroup({
    'reason':new FormControl('', Validators.required),
    
  });

  submit(){
    if(this.userForm.valid){

      const email =localStorage.getItem('email');
      const mensagem = JSON.parse(`{"email":"${email}","reason":"${this.userForm.value.reason}"}`);
      
      this.service.makeRequest(mensagem).subscribe((res)=>{

      })
      document.querySelector<HTMLElement>('.bg-modal')!.style.display ="none";

    }else{
      this.errormsg="Pleasy specify the reason!"
    }
  }
  
  closeModal1(){
    document.querySelector<HTMLElement>('.bg-modal1')!.style.display ="none";
  }

  pedirChave(){
    const email = localStorage.getItem('email');
    
    this.service.makeRequest(email).subscribe((res)=>{
      alert(res.message)
      if(res.message =='assigned'){
        
        document.querySelector<HTMLElement>('.bg-modal1')!.style.display ="flex";
      } else{
        this.mensagem = res.message; 
      }
    })
  }

}
