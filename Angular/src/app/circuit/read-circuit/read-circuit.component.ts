import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-circuit',
  templateUrl: './read-circuit.component.html',
  styleUrls: ['./read-circuit.component.css']
})
export class ReadCircuitComponent implements OnInit {
  readCircuit:any;
  successmsg:any;
  constructor(private service : AppServiceService,private Router:Router) { }

  ngOnInit(): void {
    this.service.getCircuit().subscribe((res)=>{
      console.log(res,"res==>");

      this.readCircuit = res;
    });
  }




delete_id(id:any)
{
  console.log(id, 'deleteid==>');
  this.service.deleteCircuit(id).subscribe((res)=>{
    console.log(res,'deleteres==>');
    this.successmsg = res.message;

    this.service.getCircuit().subscribe((res)=>{
      console.log(res,"res==>");
      this.readCircuit= res;
    });

  });
}

}
