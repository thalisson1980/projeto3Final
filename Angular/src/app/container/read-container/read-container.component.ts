import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-read-container',
  templateUrl: './read-container.component.html',
  styleUrls: ['./read-container.component.css']
})
export class ReadContainerComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router, private activatedRoute: ActivatedRoute) { }
  readContainer:any;
  successmsg:any;
  getparamid:any;
  readDDCCFF:any;

  ngOnInit(): void {

    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
  this.service.getOneContainer(this.getparamid).subscribe((res)=>{
    this.successmsg = res.message;
    this.readContainer=[res]
    console.log(res.container, "res==>");
    this.readContainer = [res.container];

  });

    this.service.getContainer().subscribe((res)=>{
      console.log(res,"res==>");

      this.readContainer = res;
    });

    this.service.getDDCCFF().subscribe((res)=>{
      console.log(res,"res==>");

      this.readDDCCFF = res;
    });
  }


  getContainerId(id:any)
  {
    // console.log(id, 'resId==>');
   this.service.getOneContainer(id).subscribe((res)=>{
     this.successmsg = res.message;
     this.readContainer=[res.container]
     console.log(res.container, "res==>");


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
  logout(){
    this.service.logout();

  }
  }


