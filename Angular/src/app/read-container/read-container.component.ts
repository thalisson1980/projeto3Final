import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-container',
  templateUrl: './read-container.component.html',
  styleUrls: ['./read-container.component.css']
})
export class ReadContainerComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router) { }
  read_container:any;

  ngOnInit(): void {
    this.service.getContainer().subscribe((res)=>{
      console.log(res,"res==>");

      this.read_container = res;
    });
  }

}
