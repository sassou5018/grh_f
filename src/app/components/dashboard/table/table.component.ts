import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, filter } from 'rxjs';
import { ICollaborateur } from 'src/app/interfaces/ICollaborateur';
import { CollaborateurService } from 'src/app/services/collaborateurService/collaborateur.service';
import { FilesService } from 'src/app/services/filesService/files.service';
import { FilesDialogComponent } from '../files-dialog/files-dialog.component';
import * as dayjs from 'dayjs';
import { ConsultComponent } from '../consult/consult.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [DialogService]
})
export class TableComponent implements OnInit {
  collaborateurs: Observable<ICollaborateur[]> = this.collaborateurService.getAll();
  x: any[] = [];



  constructor(private collaborateurService: CollaborateurService, private filesService: FilesService, public dialogueService: DialogService) { }


  ngOnInit(): void {
  }

  parseAnciennete(date: Date){
    return dayjs().from(dayjs(date), true);
  }

  showPJ(id: number, nom: string){
    this.dialogueService.open(FilesDialogComponent, {
      data: {
        id: id
      },
      header: `Liste des pièces jointes de ${nom}`,
      width: '70%'
    });
  }

  showUser(data: ICollaborateur){
    this.dialogueService.open(ConsultComponent, {
      data: {data, breadCrumb: [data.nomComplet]},
      header: `Consultation de ${data.nomComplet}`,
      width: '75%'
    })
  }
}
