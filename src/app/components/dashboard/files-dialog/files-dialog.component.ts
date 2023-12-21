import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { CollaborateurService } from 'src/app/services/collaborateurService/collaborateur.service';
import { FilesService } from 'src/app/services/filesService/files.service';
import * as moment from 'moment';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-files-dialog',
  templateUrl: './files-dialog.component.html',
  styleUrls: ['./files-dialog.component.scss']
})
export class FilesDialogComponent implements OnInit {
  @Input()
  id?: number;
  @Input()
  withInput: boolean = false;
  identifier: number = 0;
  files: Observable<any> = this.filesService.getFilesByCollaborateurId(this.identifier);

  constructor(private filesService: FilesService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
     if(this.withInput){
        this.identifier = this.id!;
     }
      else{
        this.identifier = this.config.data.id;
      }
  }


  openFile(event: any, fileName: string) {
    event.preventDefault();
    this.filesService.openFile(event, fileName);
  }

  parseTime(date: Date){
    return dayjs().format('DD, MMM YYYY - HH:mm');
  }
}
