import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private _http : HttpClient) { }

  apiURL = 'http://localhost:3000/user'

  getUsers():Observable<any>
  {
    return this._http.get(`${this.apiURL}`)
  }

  criarUser(dados:any):Observable<any>
  {
    return this._http.post(`${this.apiURL}`,dados);
  }

  login(dados:any):Observable<any>
  {
     return this._http.post("http://localhost:3000/user/login",dados,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Expose-Headers': ['Set-Cookie'],

      }),withCredentials:true});
  }

  makeRequest(dados:any):Observable<any>
  {

      return this._http.post("http://localhost:3000/keyRequest",dados);
  }

  listContainers(dados:any):Observable<any>
  {


    return this._http.post("http://localhost:3000/containerCollection/findByUser",dados);
  }

  listCounties():Observable<any>
  {
    return this._http.get("http://localhost:3000/DDCCFF/allCounties");
  }

  listParish(code:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/DDCCFF/parishList",code);
  }

  listContainersByParish(code:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/container/containers/byParish",code);
  }

  getDates(data:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/containerCollection/dates",data);
  }


  //CRUD circuit
  createCircuit(data:any):Observable<any>
  {
    console.log(data,'createapi=>')
    return this._http.post("http://localhost:3000/circuit",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getCircuit():Observable<any>
  {
    return this._http.get("http://localhost:3000/circuit",{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  deleteCircuit(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/circuit/${ids}`);
  }

  //CRUD collection
  createCollection(data:any):Observable<any>
  {
    console.log(data,'createapi=>')
    return this._http.post("http://localhost:3000/collection",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getCollection():Observable<any>
  {
    return this._http.get("http://localhost:3000/collection",{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  deleteCollection(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/collection/${ids}`);
  }

  //CRUD container
  createContainer(data:any):Observable<any>
  {
    console.log(data,'createapi=>')
    return this._http.post("http://localhost:3000/container",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getContainer():Observable<any>
  {
    return this._http.get("http://localhost:3000/container",{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  deleteContainer(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/container/${ids}`);
  }

  //CRUD employee
  createEmployee(data:any):Observable<any>
  {
    console.log(data,'createapi=>')
    return this._http.post("http://localhost:3000/employee",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getEmployee():Observable<any>
  {
    return this._http.get("http://localhost:3000/employee",{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  deleteEmployee(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/employee/${ids}`);
  }

  updateEmployee(data:any,id:any):Observable<any>
  {
    let ids=id;
    return this._http.put(`http://localhost:3000/employee/${ids}`,data);
  }
}
