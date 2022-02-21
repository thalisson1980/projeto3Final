import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-read-one-colletion-circuit',
  templateUrl: './read-one-colletion-circuit.component.html',
  styleUrls: ['./read-one-colletion-circuit.component.css']
})
export class ReadOneColletionCircuitComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router,private activatedRoute: ActivatedRoute) { }

  read_circuit:any;
  successmsg:any;
 getparamid:any;


  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.getOneCollectionCircuit(this.getparamid).subscribe((res)=>{
        this.successmsg = res.message;
        this.read_circuit=[res]
        console.log(res.circuit, "res==>");
        this.read_circuit = [res.circuit];

      });

  }
  logout(){
    this.service.logout();
  }

}
