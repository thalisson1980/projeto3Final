import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-key-requests',
  templateUrl: './key-requests.component.html',
  styleUrls: ['./key-requests.component.css']
})
export class KeyRequestsComponent implements OnInit {

  constructor(private service:AppServiceService, private router: Router, private activatedRoute: ActivatedRoute) { }
  keyRequests:any;
  ngOnInit(): void {
    this.service.getKeyRequests().subscribe((res)=>{
      console.log(res,"res==>");

      this.keyRequests = res.pedidos;
    });
  }


 decision(idChave:any,decision:any,user:any){
   let data = {
     idChave,
     decision,
     user
   }
  this.service.updateKeyRequest(data).subscribe((res)=>{
    console.log(res)
    if(res.idUser){
      let aux = {
        user:res.idUser
      }
      this.service.assignKey(aux).subscribe((res)=>{
        location.reload();
      });
    }else{
      location.reload();
    }
    
  });
 
 }

  logout(){
    this.service.logout();

  }
}
