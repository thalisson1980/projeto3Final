import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-circuit',
  templateUrl: './read-circuit.component.html',
  styleUrls: ['./read-circuit.component.css']
})
export class ReadCircuitComponent implements OnInit {
  read_circuit:any;

  constructor(private service : AppServiceService,private Router:Router) { }

  ngOnInit(): void {
    this.service.getCircuit().subscribe((res)=>{
      console.log(res,"res==>");

      this.read_circuit = res;
    });
  }

}
