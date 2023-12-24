import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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

  getStats(){
    return this.http.get<any>('/api' + 'api/contrat/stats').pipe(map(data=>{
      return{
        labels: ['Salaire moyen', 'Salaire total'],
        datasets: [
          {
            label: 'Salaire moyen',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [data.avgSalaire]
          },
          {
            label: 'Salaire total',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [data.totalSalaire]
          }
        ]
      }
    }));
  }

  

}
