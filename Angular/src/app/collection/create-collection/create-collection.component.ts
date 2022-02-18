import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  constructor(private service:AppServiceService,private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.logout();

  }
}
