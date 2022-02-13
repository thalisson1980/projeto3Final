import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { max } from 'rxjs';
import { Chart,registerables  } from 'chart.js';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

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
  collectionsV3:any;
 

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
  
  user:any;
  userKey:any;
  escolheuUpdate:any;

  ngOnInit(): void {

    this.service.getOneUser(localStorage.getItem('id')).subscribe((res)=>{
      if(res.collections){
        
        
         this.user = res.user_id;
         if(res.userKey !== "No valid key"){
           this.userKey = res.userKey;
         }
        
      } else{
        this.mensagem = res.ERROR;; 
      }
    })

  }

  
   fechar() {
    this.mensagem = ""; 
  }


  ativarUpdate(){
    this.escolheuUpdate = true;
    const nome = document.getElementById('paiNome');
    const email= document.getElementById('paiEmail');
    const antigoNome = document.getElementById('userName')!;
    const antigoEmail = document.getElementById('userEmail')!;
    nome?.removeChild(antigoNome)
    email?.removeChild(antigoEmail)

    const botaoUpdate = document.getElementById('update');
    botaoUpdate?.parentNode?.removeChild(botaoUpdate);

    const novoNome = document.createElement('input');
    novoNome.setAttribute('value',"teste");
    const novoEmail = document.createElement('input');
    novoEmail.setAttribute('value',"teste");
    nome?.appendChild(novoNome);
    email?.appendChild(novoEmail);

  }
  closeModal2(){
    document.querySelector<HTMLElement>('.bg-modal2')!.style.display ="none";
  }

  closeModal4(){
    document.querySelector<HTMLElement>('.bg-modal4')!.style.display ="none";
  }
  closeModal5(){
    document.querySelector<HTMLElement>('.bg-modal5')!.style.display ="none";
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
          for (const collection of this.collections){
            let aux = collection.massaCollect_kg/collection.totalCollections;
            collection.massaCollect_kg = collection.massaCollect_kg - ((collection.totalCollections-collection.numberCollections)*aux)
          }
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
  }

  historicoDeposicaoPorMes(){
    
   var collectionsV2 = new Array;
    document.querySelector<HTMLElement>('.bg-modal5')!.style.display ="flex";
    const dados = {
      email:localStorage.getItem('email'),
      token:localStorage.getItem('token')
    }
    var data = {choice: "recolha",code:"null",email: localStorage.getItem('email')}
      this.service.getDates(data).subscribe((res)=>{
        if(res){
      
          this.collections = res.collections;
          let primeiro = true;
          for (const collection of this.collections){
            let aux = collection.massaCollect_kg/collection.totalCollections;
            collection.massaCollect_kg = collection.massaCollect_kg - ((collection.totalCollections-collection.numberCollections)*aux);      
            try{
              
              if(primeiro){
                var collectionAux = new Date(collection.collectionDate);
                var obj = {
                  ano: collectionAux.getFullYear(),
                  mes: collectionAux.getMonth()+1,
                  pesoDepositado:collection.massaCollect_kg,
                  numeroDeposicoes:collection.numberCollections
                }
            
                collectionsV2.push(obj)
                primeiro=false;
                
              }else{
                var existe = false;
                var collectionAux = new Date(collection.collectionDate);
                for(const collectionV2 of collectionsV2){
                    if(collectionV2.ano === collectionAux.getFullYear()){
                      if(collectionV2.mes === collectionAux.getMonth()+1){
                        existe = true;
                        collectionV2.pesoDepositado = collectionV2.pesoDepositado + collection.massaCollect_kg ;
                        collectionV2.numeroDeposicoes = collectionV2.numeroDeposicoes + collection.numberCollections;
                      }
                  }
                }
                if(!existe){
                  var obj = {
                    ano: collectionAux.getFullYear(),
                    mes: collectionAux.getMonth()+1,
                    pesoDepositado:collection.massaCollect_kg,
                    numeroDeposicoes:collection.numberCollections
                  }
                  collectionsV2.push(obj)
                }
              }

             
            }catch(err){

            }
          
          }
        
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
     
      this.collectionsV3 = collectionsV2;
  }

 

  
}