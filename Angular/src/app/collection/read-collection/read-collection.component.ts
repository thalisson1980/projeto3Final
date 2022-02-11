import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-read-collection',
  templateUrl: './read-collection.component.html',
  styleUrls: ['./read-collection.component.css']
})
export class ReadCollectionComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router) { }
  read_collection:any;
  successmsg:any;

  ngOnInit(): void {
    this.service.getCollection().subscribe((res)=>{
      console.log(res,"res==>");

      this.read_collection = res;
    });
  }



  deleteID(id:any)
  {
    // console.log(id, 'deleteid==>');
    // this.service.deleteCollection(id).subscribe((res)=>{
    //   console.log(res,'deleteres==>');
    //   this.successmsg = res.message;

    // })
  }

  }
