import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Host, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agence } from './model/agence.model';
import { Agent } from './model/agent.modal';
import { Client } from './model/client.model';
import { TypeVehicule } from './model/typeVehicule.model';
import { Vehicule } from './model/vehicule.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  formData:Vehicule;
  categorieV:TypeVehicule[];
  public host:string="http://localhost:8080";

  constructor(private httpClient:HttpClient) { }

  public getAgences(page:number,size:number){
    return this.httpClient.get(this.host+"/agences?page="+page+"&size="+size);
  }

  public getAgencesByKeyword(mc:string,page:number,size:number){
    return this.httpClient.get(this.host+"/agences/search/byAdresseAgencePage?mc="+mc+
                                          "&page="+page+"&size="+size);
  }

  public getAgents(page:number,size:number){
    return this.httpClient.get(this.host+"/agents?page="+page+"&size="+size);
  }

  public getAgentByKeyword(mc:string,page:number,size:number){
    return this.httpClient.get(this.host+"/agents/search/byMatriculeAgentPage?mc="+mc+
                                          "&page="+page+"&size="+size);
  }

  public getClients(page:number,size:number){
    return this.httpClient.get(this.host+"/clients?page="+page+"&size="+size);
  }

  public getClientByKeyword(mc:string,page:number,size:number){
    return this.httpClient.get(this.host+"/clients/search/byCniClientPage?mc="+mc+
                                          "&page="+page+"&size="+size);
  }

  public getVehiculeRessource(url){
    return this.httpClient.get(this.host+url);
  }

  public getVehiDetail(url):Observable<Vehicule>{
    return this.httpClient.get<Vehicule>(url);
  }

  public getTypeVehicule(url){
    return this.httpClient.get(this.host+url);
  }

  public deleteRessource(url){
    return this.httpClient.delete(url); 
  }

  public saveRessource(url,data):Observable<Agence>{
    return this.httpClient.post<Agence>(url,data);
  }

  public getRessource(url):Observable<Agence>{
    return this.httpClient.get<Agence>(url);
  }

  public updateRessource(url,data){
    return this.httpClient.put(url,data);
  }

  public saveAgent(url,data):Observable<Agent>{
    return this.httpClient.post<Agent>(url,data);
  }

  public getAgent(url):Observable<Agent>{
    return this.httpClient.get<Agent>(url);
  }

  public saveClient(url,data):Observable<Client>{
    return this.httpClient.post<Client>(url,data);
  }

  public saveVehicule(url,data){
    return this.httpClient.post<Vehicule>(url,data);
  }

  public getVehiculeCategorie():Observable<any[]>{
    return this.httpClient.get<any>(this.host+"/typeVehicules");
  }

  public getClient(url):Observable<Client>{
    return this.httpClient.get<Client>(url);
  }

  uploadPhotoVehicule(file: File, matriculeVehi): Observable<HttpEvent<{}>> {
    let formData:FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+matriculeVehi, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req);
  }

}
