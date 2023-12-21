import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INatureQualif } from 'src/app/interfaces/INatureQualif';
import { INiveauQualif } from 'src/app/interfaces/INiveauQualif';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http: HttpClient) { }

  getAllNatures(){
    return this.http.get<INatureQualif[]>('/api' + 'api/naturequalif');
  }

  getAllNiveau(){
    return this.http.get<INiveauQualif[]>('/api' + 'api/niveauqualif');
  }
}
