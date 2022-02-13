import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor() { }
  user:any;
  anonimo:any;
  ngOnInit(): void {

    if(localStorage.getItem('email')){
      this.user= true;
    }else{
      this.anonimo = true;
    }
    console.log("teste"+this.user)
  }

}
