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
    return this._http.get(`${this.apiURL}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true})
  }

  // criarUser(dados:any):Observable<any>
  // {
  //   return this._http.post(`${this.apiURL}`,dados);
  // }

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
  logout():Observable<any>
  {
     return this._http.get("http://localhost:3000/user/logout",{ headers: new HttpHeaders({
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

      return this._http.post("http://localhost:3000/keyRequest",dados,{ headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': '*'
        }),withCredentials:true});
  }

  listContainers(dados:any):Observable<any>
  {


    return this._http.post("http://localhost:3000/containerCollection/findByUser",dados,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  listCounties():Observable<any>
  {
    return this._http.get("http://localhost:3000/DDCCFF/allCounties",{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  listParish(code:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/DDCCFF/parishList",code,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  listContainersByParish(code:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/container/containers/byParish",code,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  getDates(data:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/containerCollection/dates",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getDatesAn(data:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/containerCollection/datesAnonimo",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getKeyRequests():Observable<any>
  {
    return this._http.get("http://localhost:3000/keyRequest/getPending",{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  updateKeyRequest(data:any):Observable<any>
  {
    return this._http.put("http://localhost:3000/keyRequest",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  assignKey(data:any):Observable<any>
  {
    return this._http.post("http://localhost:3000/key",data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

//CRUD key
createKey(data:any):Observable<any>
{
  console.log(data,'createapi=>')
  return this._http.post("http://localhost:3000/key",data,{ headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': '*'
    }),withCredentials:true});
}
getKey():Observable<any>
{
  return this._http.get("http://localhost:3000/key",{ headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': '*'
    }),withCredentials:true});
}

getOneKey(id:any):Observable<any>
{
  let ids=id;
  return this._http.get(`http://localhost:3000/key/${ids}`,{ headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': '*'
    }),withCredentials:true});
}

deleteKey(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`http://localhost:3000/key/${ids}`,{ headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': '*'
    }),withCredentials:true});
}

updateKey(data:any,id:any):Observable<any>
{
  let ids=id;
  return this._http.put(`http://localhost:3000/key/${ids}`,data,{ headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': '*'
    }),withCredentials:true});
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
  getOneCircuit(id:any):Observable<any>
  {
    let ids=id;
    return this._http.get(`http://localhost:3000/circuit/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  getOneCollectionCircuit(id:any):Observable<any>
  {
    let ids=id;
    return this._http.get(`http://localhost:3000/circuit/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
  deleteCircuit(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/circuit/${ids}`, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  updateCircuit(data:any,id:any):Observable<any>
  {
    let ids=id;
    return this._http.put(`http://localhost:3000/circuit/${ids}`,data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
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

  getOneCollection(id:any):Observable<any>
  {
    let ids=id;
    return this._http.get(`http://localhost:3000/collection/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});

  }


  deleteCollection(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/collection/${ids}`);
  }
  updateCollection(data:any,id:any):Observable<any>
  {
    let ids=id;
    return this._http.put(`http://localhost:3000/user/${ids}`,data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
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

  getOneContainer(id:any):Observable<any>
  {
    let ids=id;
    return this._http.get(`http://localhost:3000/container/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  deleteContainer(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/container/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  updateContainer(data:any,id:any):Observable<any>
  {
    let ids=id;
    return this._http.put(`http://localhost:3000/container/${ids}`,data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
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

  getOneEmployee(id:any):Observable<any>
  {
    let ids=id;
    return this._http.get(`http://localhost:3000/employee/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  deleteEmployee(id:any):Observable<any>
  {
    let ids=id;
    return this._http.delete(`http://localhost:3000/employee/${ids}`,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }

  updateEmployee(data:any,id:any):Observable<any>
  {
    let ids=id;
    return this._http.put(`http://localhost:3000/employee/${ids}`,data,{ headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': '*'
      }),withCredentials:true});
  }
 //CRUD user
 criarUser(data:any):Observable<any>
 {
   console.log(data,'createapi=>')
   return this._http.post("http://localhost:3000/user",data,{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }
 getUser():Observable<any>
 {
   return this._http.get("http://localhost:3000/user",{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }

 getOneUser(id:any):Observable<any>
 {
   let ids=id;
   return this._http.get(`http://localhost:3000/user/${ids}`,{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }

 deleteUser(id:any):Observable<any>
 {
   let ids=id;
   return this._http.delete(`http://localhost:3000/user/${ids}`,{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }

 updateUser(data:any,id:any):Observable<any>
 {
   let ids=id;
   return this._http.put(`http://localhost:3000/user/${ids}`,data,{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }

 //CRUD DDCCFF
 getDDCCFF():Observable<any>
 {
   return this._http.get("http://localhost:3000/list_DCF",{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }

 getOneDDCCFF(id:any):Observable<any>
 {
   let ids=id;
   return this._http.get(`http://localhost:3000/list_DCF/${ids}`,{ headers: new HttpHeaders({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Credentials': 'true',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
     'Access-Control-Allow-Headers': '*'
     }),withCredentials:true});
 }
}
