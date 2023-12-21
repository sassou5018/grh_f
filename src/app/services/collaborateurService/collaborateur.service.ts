import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICollaborateur, ICollaborateurRequest } from 'src/app/interfaces/ICollaborateur';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  
  
  
  constructor(private http: HttpClient) { }
  
  
  searchCollaborateurByNomComplet(nomComplet: string) {
    return this.http.get<ICollaborateur[]>('/api' + 'api/collaborateur/search?name=' + nomComplet);
  }
  
  
  postCollaborateur(collaborateur: ICollaborateurRequest){
    return this.http.post<ICollaborateur>('/api' + 'api/collaborateur', collaborateur);
  }
  
  postCollaborateurMultiPart(formData: any){
    return this.http.post<boolean>('/api' + 'api/collaborateur', formData, {observe: 'events', reportProgress: true});
  }
  
  
  getAll(){
    return this.http.get<ICollaborateur[]>('/api' + 'api/collaborateur');
  }
  
  
  deleteCollaborateur(id: number) {
    return this.http.delete('/api' + 'api/collaborateur/' + id);
  }
  
  
  
  
  getOne(id: number) {
    return this.http.get<ICollaborateur>('/api' + 'api/collaborateur/' + id);
  }


}