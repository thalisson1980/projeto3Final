import { Component, OnInit } from '@angular/core';
import { AppServiceService} from '../../app-service.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {


  constructor(private service:AppServiceService,private router: Router, private activatedRoute: ActivatedRoute ) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  readEmployee:any;
  readCircuit:any;
  readCollection:any;
  employee1: any = "";
  employee2: any = "";
  employee3: any = "";
  circuit_cod: any = "";

  ngOnInit(): void {

    this.getparamid = this.activatedRoute.snapshot.paramMap.get('id');

    if(this.getparamid){
    this.service.getOneCollection(this.getparamid).subscribe((res)=>{
      console.log(res, 'res==>');
      // console.log('res',res.collection.name)
      this.collectionForm.patchValue({
        employees: res.collection[0].employees.name,
        circuit: res.collection[0].circuit.circuit_code,
        dateStartTime: res.collection[0].dateStartTime,
        dateEndTime: res.collection[0].dateEndTime,
        massaCollect_kg: res.collection[0].massaCollect_kg
      });
    });
  }


this.service.getCollection().subscribe((res)=>{
    console.log(res,"res==>");

    this.readCollection = res;
  });

  this.service.getEmployee().subscribe((res)=>{
    console.log(res,"res==>");

    this.readEmployee = res;
  });

  this.service.getCircuit().subscribe((res)=>{
    console.log(res,"res==>");

    this.readCircuit = res;
  });
  }

  collectionForm = new FormGroup({
    // '_id':new FormControl('',Validators.required),
    'employees':new FormControl(['',Validators.required]),
    'circuit':new FormControl('',Validators.required),
    'dateStartTime':new FormControl('',Validators.required),
    'dateEndTime':new FormControl('',Validators.required),
    'massaCollect_kg':new FormControl('',Validators.required),
  });


 collectionSubmit()
  {
  if(this.collectionForm.valid)
  {
  console.log(this.collectionForm.value);

  this.service.createCollection(this.collectionForm.value).subscribe((res)=>{
    console.log(res, 'res==>');
    this.collectionForm.reset();
    this.successmsg = res.message;


  });

  }
  // else
  // {
  //   this.errormsg = 'All field is required';
  // }
}

collectionUpdate()
{
  console.log(this.collectionForm.value,'updatedForm');
  if(this.collectionForm.valid)
  {
    this.service.updateCollection(this.collectionForm.value, this.getparamid).subscribe((res)=>{
      console.log(res, 'resupdated');
      this.successmsg = res.message;
    })
  }else{
    this.errormsg = 'all field is required';
  }
}


  logout(){
    this.service.logout();

  }
}
