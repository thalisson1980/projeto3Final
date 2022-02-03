import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
     return this._http.post("http://localhost:3000/user/login",dados);
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
    return this._http.post("http://localhost:3000/container/containers",code);
  }

  getDates(data:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/containerCollection/dates",data);
  }

  getEmployee():Observable<any>
  {
    return this._http.get("http://localhost:3000/employee");
  }
  getCircuit():Observable<any>
  {
    return this._http.get("http://localhost:3000/circuit");
  }
  getContainer():Observable<any>
  {
    return this._http.get("http://localhost:3000/container");
  }
}
