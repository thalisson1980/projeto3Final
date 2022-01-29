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

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;
  

  ngOnInit(): void {
    
  }

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

  historicoContentor(){
    
    const email = localStorage.getItem('email');
    this.service.listContainers(email).subscribe((res)=>{
      console.log(res)
      if(res.collections){
        document.querySelector<HTMLElement>('.bg-modal2')!.style.display ="flex";
        
         this.collections = res.collections;
        
      } else{
        this.mensagem = res.ERROR;; 
      }
    })
  }

  depositionsHistory(){
    document.querySelector<HTMLElement>('.bg-modal3')!.style.display ="flex";
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

         var datesFirst = res.first.split('-');
         var restFirst = datesFirst[2].split('T');
         var minimum = datesFirst[0] + '-' + datesFirst[1] +'-'+restFirst[0];

         var datesLast = res.last.split('-');
         var restLast = datesLast[2].split('T');
         var maximum = datesLast[0] + '-' + datesLast[1] +'-'+restLast[0];
  
          var input = document.getElementById("start");
          input!.setAttribute("min", minimum);
          input!.setAttribute("max",maximum);

          var inputEnd = document.getElementById("end");
          inputEnd!.setAttribute("min", minimum);
          inputEnd!.setAttribute("max",maximum);
        
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

         var datesFirst = res.first.split('-');
         var restFirst = datesFirst[2].split('T');
         var minimum = datesFirst[0] + '-' + datesFirst[1] +'-'+restFirst[0];

         var datesLast = res.last.split('-');
         var restLast = datesLast[2].split('T');
         var maximum = datesLast[0] + '-' + datesLast[1] +'-'+restLast[0];
  
          var input = document.getElementById("start");
          input!.setAttribute("min", minimum);
          input!.setAttribute("max",maximum);

          var inputEnd = document.getElementById("end");
          inputEnd!.setAttribute("min", minimum);
          inputEnd!.setAttribute("max",maximum);
        
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
        
        } else{
          this.mensagem = res.ERROR;; 
        }
      })
    }
  }

  createChart(){
    let listOfDate = [];
    let listOfKG = [];
    for (const obj of this.list){
       listOfDate.push(obj.collectionDate);
       listOfKG.push(obj.massCollected_kg);
    }
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
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
    this.createChart();
  }
}
}