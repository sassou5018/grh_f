import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAvantage } from 'src/app/interfaces/IAvantage';
import { IPieceJointeType } from 'src/app/interfaces/IPieceJointeType';
import { ITypeContrat } from 'src/app/interfaces/ITypeContrat';

@Injectable({
  providedIn: 'root'
})
export class ContratService {

  constructor(private http: HttpClient) { }

  getAllTypesContrat(){
    return this.http.get<ITypeContrat[]>('/api' + 'api/typecontrat');
  }


  /**
   * All Avantages with TypeContratId = id (SELECT * FROM Avantage WHERE TypeContratId = id)
   * @param id TypeContratID
   * @returns All Avantages with TypeContratId = id (SELECT * FROM Avantage WHERE TypeContratId = id)
   */
  getAvantageByTypeContrat(typeContratId: ITypeContrat['id']){
    return this.http.get<IAvantage[]>('/api' + 'api/avantage/search', {params: {type: typeContratId}});
  }




  getPieceJointeByTypeContrat(typeContratId: ITypeContrat['id']){
    return this.http.get<IPieceJointeType[]>('/api' + 'api/pj/search', {params: {typecontratid: typeContratId}});
  }

  

}
