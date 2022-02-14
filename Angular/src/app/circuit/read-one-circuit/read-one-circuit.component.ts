import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-read-one-circuit',
  templateUrl: './read-one-circuit.component.html',
  styleUrls: ['./read-one-circuit.component.css']
})
export class ReadOneCircuitComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router,private activatedRoute: ActivatedRoute ) { }

  read_circuit:any;
  successmsg:any;
 getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.getOneCircuit(this.getparamid).subscribe((res)=>{
        this.successmsg = res.message;
        this.read_circuit=[res]
        console.log(res.circuit, "res==>");
        this.read_circuit = [res.circuit];

      });

  }

}
