import { Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
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

  createChart(listOfDate:any,listOfKG:any){
    
   
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    this.chart= new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: listOfDate, 
        datasets: [{
            label: 'KG collected',
            data: listOfKG,
            borderWidth: 1,
            backgroundColor: ['rgba(75, 192, 192, 0.2)']
        }]
    } ,
      options: {
          scales: {
              y: {
                  beginAtZero: true
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
       let outrasDepoiscoes =  obj.totalCollections-obj.numberCollections;
       let pesoDepositado = obj.massaCollect_kg-(pesoPorDeposicao*outrasDepoiscoes )
       listOfKG.push(pesoDepositado);
     
    }
    this.createChart(listOfDate,listOfKG)
  }
 
compare(){
  try{
    this.chart.destroy();
  }catch(err){

  }
 
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

compararSemana(){
 this.list = [];
 var hoje = new Date();
 var ultimaSemana = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()-7);
 console.log(this.collectionsList)
 for (let i = 0; i<this.collectionsList.length ; i++) {
  var collectDate = new Date(this.collectionsList[i].collectionDate);
  if ( collectDate >= ultimaSemana ) {
    this.list.push(this.collectionsList[i])
  }
}
this.criarArrayDuasDatas();
}


}
