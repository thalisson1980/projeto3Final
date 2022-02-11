import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-container',
  templateUrl: './read-container.component.html',
  styleUrls: ['./read-container.component.css']
})
export class ReadContainerComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router) { }
  readContainer:any;
  successmsg:any;

  ngOnInit(): void {
    this.service.getContainer().subscribe((res)=>{
      console.log(res,"res==>");

      this.readContainer = res;
    });
  }



  deleteID(id:any)
  {
    console.log(id, 'deleteid==>');
    this.service.deleteContainer(id).subscribe((res)=>{
      console.log(res,'deleteres==>');
      this.successmsg = res.message;

    })
  }

  }
