import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICollaborateur } from 'src/app/interfaces/ICollaborateur';
import { CollaborateurService } from 'src/app/services/collaborateurService/collaborateur.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.scss'],
  providers: [DialogService, MessageService]
})
export class ConsultComponent implements OnInit {

  collaborateur: ICollaborateur = this.config.data.data;
  information!: FormGroup;
  dateNaissance: Date = new Date(this.collaborateur.dateNaissance);
  dateDebutContrat = this.collaborateur.contrat.dateDeb ? new Date(this.collaborateur.contrat.dateDeb) : null;
  dateFinContrat = this.collaborateur.contrat.dateFin ? new Date(this.collaborateur.contrat.dateFin) : null;
  reccomendationCheck: boolean = this.collaborateur.reccommender != null ? true : false;
  breadCrumb: string[] = this.config.data.breadCrumb;
  bcModel: MenuItem[] = [];
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private collaborateurService: CollaborateurService, public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {
      console.log(this.collaborateur);
      console.log("BreadCrumb:",this.breadCrumb);
      this.breadCrumb.forEach((item, index) => {
        this.bcModel.push({
          label: item
        })
      });
  }

  getSalaireTooltip(){
    return `Salaire De Base: ${this.collaborateur.contrat.typeContrat.salaireDeBase}  +  ${this.collaborateur.contrat.salaire - this.collaborateur.contrat.typeContrat.salaireDeBase} = Total: ${this.collaborateur.contrat.salaire}`
  }

  showProfil(value: "resp" | "reccomendation"){
    if(value == "resp"){
      this.collaborateurService.getOne(this.collaborateur.poste.responsable.id).subscribe({
        next: (data) => {
          this.dialogService.open(ConsultComponent, {
            data: {data, breadCrumb: [...this.breadCrumb, data.nomComplet]},
            header: `Consultation de ${data.nomComplet}`,
            width: '75%'
          })
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la récupération des informations du responsable'});
        }
      });
    }
    if(value == "reccomendation"){
      this.collaborateurService.getOne(this.collaborateur.reccommender?.id).subscribe({
        next: (data) => {
          this.dialogService.open(ConsultComponent, {
            data: {data, breadCrumb: [...this.breadCrumb, data.nomComplet]},
            header: `Consultation de ${data.nomComplet}`,
            width: '75%'
          })
        },
        error: (err) => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la récupération des informations du collaborateur ayant recommandé'});
        }
      });
    }
  }
}
