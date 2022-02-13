import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormControl, FormGroup, Validators,FormsModule} from '@angular/forms';
import { max } from 'rxjs';
import { Chart,registerables  } from 'chart.js';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.css']
})


export class CompararComponent implements OnInit {

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
  tipoComparacao:any;

  chart:any;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  ngOnInit(): void {
    
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
          this.atribuirData(res)
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
          this.atribuirData(res)
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
          this.atribuirData(res)
        
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
    }
  }

  atribuirData(res:any){
    this.collectionsList = res.collections;

    var datesFirst = res.first.split('-');
    var restFirst = datesFirst[2].split('T');
    var minimum = datesFirst[0] + '-' + datesFirst[1] +'-'+restFirst[0];

    var datesLast = res.last.split('-');
    var restLast = datesLast[2].split('T');
    var maximum = datesLast[0] + '-' + datesLast[1] +'-'+restLast[0];

     var inputStart = document.getElementById("start");
     inputStart!.setAttribute("min", minimum);
     inputStart!.setAttribute("max",maximum);

     var inputEnd = document.getElementById("end");
     inputEnd!.setAttribute("min", minimum);
     inputEnd!.setAttribute("max",maximum);
  }

  createChart(listOfDate:any,listOfMyKG:any,listOfOther:any){
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
            label: 'My depositions',
            data: listOfMyKG,
            borderWidth: 1,
            backgroundColor: ['rgba(75, 192, 192, 0.6)'],
            
        },
        {
          label: 'Other users AVG depositions',
          data: listOfOther,
          borderWidth: 1,
          backgroundColor: ['rgba(91, 33, 50, 0.6)']
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
    let listOfOther = [];
    for (const obj of this.list){
      let aux = obj.collectionDate.split('T');
       listOfDate.push(aux[0]);
       let pesoPorDeposicao = obj.massaCollect_kg/obj.totalCollections;

       let pesoDepositado = pesoPorDeposicao * obj.numberCollections;
       listOfKG.push(pesoDepositado);

       let outrasDeposicoes = pesoPorDeposicao * (obj.colecoesZona/obj.colecoesUnicas);
       if(obj.colecoesUnicas == 0){
        listOfOther.push(0);
       }else{
        listOfOther.push(outrasDeposicoes);
       }
      
     
    }
    this.createChart(listOfDate,listOfKG,listOfOther)
  }
 
compare(){

  this.dateAlert='';
  var startControl = document.getElementById('start')?.getAttribute('min');
  var endControl = document.getElementById('end')?.getAttribute('max');
  if(this.choice  || this.county){
  if(this.minDate < this.maxDate){
    
    if(this.minDate < startControl!){
      this.dateAlert = 'Please choose a valid start date!';
    }
    if(this.maxDate>endControl!){
      this.dateAlert='Please choose a valid end date!'
    }
 }else{
  this.dateAlert = 'The start date must be before the end date!';
 }
 
  }else{
    this.dateAlert = 'please fill all fields!'
  }

  if(this.choice == 'parish' && !this.parish){
    this.dateAlert = 'please fill all fields!'
  }
  if(this.choice == 'container' && !this.container){
    this.dateAlert = 'please fill all fields!'
  }

  if(!this.dateAlert){
    this.list = [];
    var minDateNoTime = new Date(this.minDate);
    var maxDateNoTime  = new Date(this.maxDate);
    maxDateNoTime.setDate(maxDateNoTime.getDate()+1);
    for (let i = 0; i<this.collectionsList.length ; i++) {
      var collectDate = new Date(this.collectionsList[i].collectionDate);
      if ( collectDate >= minDateNoTime && collectDate <= maxDateNoTime) {
        this.list.push(this.collectionsList[i])
      }
  }
  
    this.criarArrayDuasDatas();
  }
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
