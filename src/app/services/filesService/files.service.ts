import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }



  openFile(event: any, fname: string){
    event.preventDefault();
    const fileName = event.target.href;
    this.http.get(fileName, {responseType: 'blob'}).subscribe({
      next: (data)=>{
        const blob = new Blob([data], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', url);
        link.style.display = 'none';
        link.download = fname;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    })
  }


  getAllFiles(){
    return this.http.get('/api' + 'api/files');
  }

  getFilesByCollaborateurId(id: number){
    return this.http.get('/api' + 'api/files/search', {params:{id}});
  }
}
