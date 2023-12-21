import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartement } from 'src/app/interfaces/IDepartement';
import { IPoste } from 'src/app/interfaces/IPoste';
import { ITypePoste } from 'src/app/interfaces/ITypePoste';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  constructor(private http: HttpClient) { }


  gettAllDepartements(){
    return this.http.get<IDepartement[]>('/api' + 'api/departement');
  }

  getTypePosteByDepartement(departementId: IDepartement['id']){
    return this.http.get<IPoste[]>('/api' + 'api/poste/search', {params: {dep: departementId}});
  }
}
