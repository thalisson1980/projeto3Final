import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../../app-service.service';
import { FormControl, FormGroup, Validators,FormsModule} from '@angular/forms';
import { max } from 'rxjs';
import { Chart,registerables  } from 'chart.js';

@Component({
  selector: 'app-read-anonimo',
  templateUrl: './read-anonimo.component.html',
  styleUrls: ['./read-anonimo.component.css']
})
export class ReadAnonimoComponent implements OnInit {

  constructor(private service:AppServiceService) { 
    Chart.register(...registerables)
  }

  mensagem:any;
  errormsg:any;

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
  anonimo:any;

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.user= true;
    }else{
      this.anonimo = true;
    }
    console.log("teste"+this.user)
  }

  choiceMade(){
    this.service.listCounties().subscribe((res)=>{
      if(res){
        
         this.counties= res;
        
      } else{
        this.mensagem = res.ERROR;; 
      }
    }) 
  }

  countyChosen(){
    if(this.choice == 'county'){
      var data = {choice: this.choice,code:this.county,email: localStorage.getItem('email')}
      this.service.getDates(data).subscribe((res)=>{
        
        if(res){
          this.collectionsList = res.collections;
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
    }
    if(this.choice == 'parish' || this.choice == 'container' ){

    
    this.service.listParish(this.county).subscribe((res)=>{
      
      if(res){
        
         this.parishList = res;
      } else{
        this.mensagem = res.ERROR;; 
      }
    })
  }
  }

  parishChosen(){
    if(this.choice == 'parish'){
      var data = {choice: this.choice,code:this.parish,email: localStorage.getItem('email')}

       this.service.getDates(data).subscribe((res)=>{
        
        if(res){
          this.collectionsList = res.collections;
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
      }

    if(this.choice == 'parish' || this.choice == 'container'){
    this.service.listContainersByParish(this.parish).subscribe((res)=>{
      
      if(res){
        console.log(res)
         this.containers = res;
      } else{
        this.mensagem = res.ERROR;; 
      }
    })
  }
  }

  containerChosen(){
    if(this.choice == 'container'){
      var data = {choice: this.choice,id:this.container,email: localStorage.getItem('email')}
    
      this.service.getDates(data).subscribe((res)=>{
        
        if(res){
          this.collectionsList = res.collections;
        
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
    }
  }


  createChart(listOfDate:any,listOfMyKG:any){
    try{
      this.chart.destroy();
    }catch(err){
  
    }
   
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    this.chart= new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: listOfDate, 
        datasets: [{
            label: 'All depositions',
            data: listOfMyKG,
            borderWidth: 1,
            backgroundColor: ['rgba(75, 192, 192, 0.6)']
        }
      ]
    } ,
    options: {
      plugins: { 
      legend: {
        labels: {
          color: "white", 
          font: {
            size: 18
          }
        },
        
      }
    }
  }
  });
    
  }

  criarArrayDuasDatas(){
    let listOfDate = [];
    let listOfKG = [];
    for (const obj of this.list){
      let aux = obj.collectionDate.split('T');
       listOfDate.push(aux[0]);
       let pesoPorDeposicao = obj.massaCollect_kg/obj.totalCollections;
       let nDeposicoes = obj.colecoesZona +obj.numberCollections;

       let pesoDepositado = nDeposicoes*pesoPorDeposicao;
       listOfKG.push(pesoDepositado);

    }
    this.createChart(listOfDate,listOfKG)
  }
 

compararMes(){
 this.list = [];
 var hoje = new Date();
 var ultimaSemana = new Date(hoje.getFullYear(), hoje.getMonth()-1, hoje.getDate());
 for (let i = 0; i<this.collectionsList.length ; i++) {
  var collectDate = new Date(this.collectionsList[i].collectionDate);
  if ( collectDate >= ultimaSemana ) {
    this.list.push(this.collectionsList[i])
  }
}
console.log(this.list)
this.criarArrayDuasDatas();
}

compararTrimestre(escolha:any){
  this.list = [];
  var hoje = new Date();
  var ultimoSemestre= new Date(hoje.getFullYear(), hoje.getMonth()-3, hoje.getDate());
  if(escolha==1)ultimoSemestre= new Date(hoje.getFullYear(), hoje.getMonth()-6, hoje.getDate());
  let listAux = [];
  for (let i = 0; i<this.collectionsList.length ; i++){
    var primeira= new Date(this.collectionsList[i].collectionDate);
    
    try{
      if(i%2 == 0){
        var segunda = new Date(this.collectionsList[i+1].collectionDate);
        listAux.push({
            colecoesUnicas:this.collectionsList[i].colecoesUnicas + this.collectionsList[i+1].colecoesUnicas,
            colecoesZona:this.collectionsList[i].colecoesZona + this.collectionsList[i+1].colecoesZona,
            collectionDate: this.collectionsList[i+1].collectionDate,
            massaCollect_kg:this.collectionsList[i].massaCollect_kg + this.collectionsList[i+1].massaCollect_kg,
            numberCollections: this.collectionsList[i].numberCollections + this.collectionsList[i+1].numberCollections,
            totalCollections: this.collectionsList[i].totalCollections + this.collectionsList[i+1].totalCollections,
        })
      } 
    }catch(err){
      listAux.push({
        colecoesUnicas:this.collectionsList[i].colecoesUnicas,
        colecoesZona:this.collectionsList[i].colecoesZona,
        collectionDate: this.collectionsList[i].collectionDate,
        massaCollect_kg:this.collectionsList[i].massaCollect_kg,
        numberCollections: this.collectionsList[i].numberCollections,
        totalCollections: this.collectionsList[i].totalCollections,
    })
    }
  }

  for(let i=0; i<listAux.length;i++){
    var collectDate = new Date(listAux[i].collectionDate);
    if ( collectDate >= ultimoSemestre ) {
      this.list.push(listAux[i])
    }
  }
  console.log(this.list)
  this.criarArrayDuasDatas();
}

compararAno(escolha:any){
  this.list = [];
  var hoje = new Date();
  var ultimoSemestre= new Date(hoje.getFullYear()-1, hoje.getMonth(), hoje.getDate());
  if(escolha==1)ultimoSemestre= new Date(hoje.getFullYear()-50, hoje.getMonth(), hoje.getDate());
  let listAux = [];

  for (let i = 0; i<this.collectionsList.length ; i++){
    var data= new Date(this.collectionsList[i].collectionDate);
    let existe = false;
    for(let j =0; j<listAux.length;j++){
      

      if(data.getFullYear() == listAux[j].ano && data.getMonth()+1== listAux[j].mes){
        existe = true;
           listAux[j].colecoesUnicas=listAux[j].colecoesUnicas + this.collectionsList[i].colecoesUnicas 
           listAux[j].colecoesZona= listAux[j].colecoesZona + this.collectionsList[i].colecoesZona 
           listAux[j].collectionDate = this.collectionsList[i].collectionDate
           listAux[j].massaCollect_kg=  listAux[j].massaCollect_kg +this.collectionsList[i].massaCollect_kg
           listAux[j].numberCollections=listAux[j].numberCollections+  this.collectionsList[i].numberCollections 
           listAux[j].totalCollections= listAux[j].totalCollections+  this.collectionsList[i].totalCollections 
      }
    }
    if(!existe){
      listAux.push({
        colecoesUnicas: this.collectionsList[i].colecoesUnicas,
        colecoesZona: this.collectionsList[i].colecoesZona,
        collectionDate:  this.collectionsList[i].collectionDate,
        massaCollect_kg: this.collectionsList[i].massaCollect_kg,
        numberCollections:  this.collectionsList[i].numberCollections,
        totalCollections:  this.collectionsList[i].totalCollections,
        mes: data.getMonth()+1,
        ano:data.getFullYear()
      })
    }
   
  }

  for(let i=0; i<listAux.length;i++){
    var collectDate = new Date(listAux[i].collectionDate);
    if ( collectDate >= ultimoSemestre ) {
      this.list.push(listAux[i])
    }
  }
  console.log(this.list)
  this.criarArrayDuasDatas();

}

}
