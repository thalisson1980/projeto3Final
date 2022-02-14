import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { ActivatedRoute} from '@angular/router'
import { Router } from '@angular/router'
@Component({
  selector: 'app-read-one-collection',
  templateUrl: './read-one-collection.component.html',
  styleUrls: ['./read-one-collection.component.css']
})
export class ReadOneCollectionComponent implements OnInit {

  constructor(private service : AppServiceService,private Router:Router,private activatedRoute: ActivatedRoute ) { }

  read_collection:any;
  successmsg:any;
 getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');
      this.service.getOneCollection(this.getparamid).subscribe((res)=>{
        this.successmsg = res.message;
        this.read_collection=[res]
        console.log(res.collection, "res==>");
        this.read_collection = [res.collection];

      });

  }

}
