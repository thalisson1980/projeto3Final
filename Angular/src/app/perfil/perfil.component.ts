import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { max } from 'rxjs';
import { Chart,registerables  } from 'chart.js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  constructor(private service:AppServiceService) { 
    Chart.register(...registerables)
  }
  
  mensagem:any;
  errormsg:any;


  collections:any;

  choice:any;
  counties:any;
  parishList:any;
  containers:any;

  county:any;
  parish:any;
  container:any;

  period:any;

  firstCollect:any;
  lastCollect:any;

  collectionsList:any;
  minDate:any;
  maxDate:any;
  dateAlert:any;

  list:any;

  chart:any;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;
  

  ngOnInit(): void {}

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

  pedirChave(){
    const email = localStorage.getItem('email');
    this.service.makeRequest(email).subscribe((res)=>{
      if(res.message =='assigned'){
        
        document.querySelector<HTMLElement>('.bg-modal1')!.style.display ="flex";
      } else{
        this.mensagem = res.message; 
      }
    })
  }

   fechar() {
    this.mensagem = ""; 
  }

  closeModal1(){
    document.querySelector<HTMLElement>('.bg-modal1')!.style.display ="none";
  }

  closeModal2(){
    document.querySelector<HTMLElement>('.bg-modal2')!.style.display ="none";
  }

  closeModal3(){
    document.querySelector<HTMLElement>('.bg-modal3')!.style.display ="none";
  }

  closeModal4(){
    document.querySelector<HTMLElement>('.bg-modal4')!.style.display ="none";
  }


  historicoDeposicaoPorContentor(){
    document.querySelector<HTMLElement>('.bg-modal2')!.style.display ="flex";
    const dados = {
      email:localStorage.getItem('email'),
      token:localStorage.getItem('token')
    }
    this.service.listContainers(dados).subscribe((res)=>{
      if(res.collections){
        
        
         this.collections = res.collections;
        
      } else{
        this.mensagem = res.ERROR;; 
      }
    })
  }

  historicoDeposicaoPorRecolha(){
    document.querySelector<HTMLElement>('.bg-modal4')!.style.display ="flex";
    const dados = {
      email:localStorage.getItem('email'),
      token:localStorage.getItem('token')
    }

    var data = {choice: "recolha",code:"null",email: localStorage.getItem('email')}
      this.service.getDates(data).subscribe((res)=>{
        if(res){
          this.collections = res.collections;
          console.log(this.collections)
          for (const collection of this.collections){
            let aux = collection.massaCollect_kg/collection.totalCollections;
            collection.massaCollect_kg = collection.massaCollect_kg - ((collection.totalCollections-collection.numberCollections)*aux)
          }
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
  }

 

  
}