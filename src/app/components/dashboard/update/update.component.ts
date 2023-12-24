import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { from } from 'rxjs';
import { IAvantage } from 'src/app/interfaces/IAvantage';
import { ICollaborateur, ICollaborateurRequest } from 'src/app/interfaces/ICollaborateur';
import { IDepartement } from 'src/app/interfaces/IDepartement';
import { INatureQualif } from 'src/app/interfaces/INatureQualif';
import { INiveauQualif } from 'src/app/interfaces/INiveauQualif';
import { IPieceJointeType } from 'src/app/interfaces/IPieceJointeType';
import { IPoste } from 'src/app/interfaces/IPoste';
import { ITypeContrat } from 'src/app/interfaces/ITypeContrat';
import { ITypePoste } from 'src/app/interfaces/ITypePoste';
import { CollaborateurService } from 'src/app/services/collaborateurService/collaborateur.service';
import { ContratService } from 'src/app/services/contratService/contrat.service';
import { PosteService } from 'src/app/services/posteService/poste.service';
import { QualificationService } from 'src/app/services/qualificationService/qualification.service';
import collectErrors from 'src/app/utils/getAllFormErrors';
import { ifTrueThenRequired } from 'src/app/validators/ifTrueThenRequired';
import { isAlphabetic } from 'src/app/validators/isAlphabetic';
import { isDate } from 'src/app/validators/isDate';
import { isInArray } from 'src/app/validators/isInArray';
import { isMinLength } from 'src/app/validators/isMinLength';
import prettyBytes from 'pretty-bytes';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService]
})
export class UpdateComponent implements OnInit {
  enabled = true;
  infoCollaborateur!: FormGroup;
  qualification!: FormGroup;
  contrat!: FormGroup;
  poste!: FormGroup;
  autreInformation!: FormGroup;
  natureQualif: INatureQualif[] = [];
  niveauQualif: INiveauQualif[] = [];
  typeContrat: ITypeContrat[] = [];
  avantages: IAvantage[] = [];
  departements: IDepartement[] = [];
  typePostes: IPoste[] = [];
  responsable: string[] = [];
  date = new Date();
  showDateFin = false;
  reccomondation = false;
  suggestions: ICollaborateur[] = [];
  uploadedFiles: any[] = [];
  requiredPJs: IPieceJointeType[] = [];
  progress: null | number = null;
  @Input()
  collaborateur?: ICollaborateur;
  @Input()
  ref?: DynamicDialogRef;

  constructor(private qualificationService: QualificationService, private contratService: ContratService, private posteService: PosteService, private collaborateurService: CollaborateurService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.init();
  }

  onPickTypeContrat(){
    const type = this.contrat.get('typeContrat');
    this.showDateFin = type?.value.avecDateFin;
    this.contrat.get('salaireDeBase')?.setValue(type?.value.salaireDeBase);
    this.contrat.get('avantages')?.setValue([]);
    this.contratService.getAvantageByTypeContrat(type?.value.id).subscribe({
      next: (data) => {
        this.avantages = data;
        console.log("Avantages: ",this.avantages);
      },
      error: (err) => {
        console.log(err);
      }
    });
    console.log(type?.value);
    console.log(this.contrat.get('avantages')?.value);
    this.disableEnableDates(type);
    this.updatePJTypes();
  }


  private disableEnableDates(type: AbstractControl<any, any> | null){
    if(type?.value.avecDateDebut){
      this.contrat.get('dateDebut')?.setValidators([Validators.required, isDate]);
    }
    if(!type?.value.avecDateDebut){
      this.contrat.get('dateDebut')?.clearValidators();
    }
    if(type?.value.avecDateFin){
      this.contrat.get('dateFin')?.setValidators([Validators.required, isDate]);
    }
    if(!type?.value.avecDateFin){
      this.contrat.get('dateFin')?.clearValidators();
    }
    this.contrat.updateValueAndValidity();
    this.contrat.get('dateDebut')?.updateValueAndValidity();
    this.contrat.get('dateFin')?.updateValueAndValidity();
  }

  onPickDepartement(){
    const departement = this.poste.get('departement');
    this.poste.get('poste')?.setValue('');
    this.responsable = [];
    this.posteService.getTypePosteByDepartement(departement?.value.id).subscribe({
      next: (data) => {
        this.typePostes = data;
        this.poste.get('poste')?.setValue(this.typePostes[0]);
        this.poste.get('responsable')?.setValue(this.typePostes[0].responsable);
        this.responsable.push(this.typePostes[0].responsable!.nomComplet);
        console.log("POSTEEEE",data);
        console.log('Responsable: ',this.responsable);
      },
      error: (err) => {
        console.log("aaaa",err);
      }
    });
  }


  onPickPoste(){
    const poste = this.poste.get('poste')?.value;
    this.responsable = [];
    this.poste.get('responsable')?.setValue(poste.responsable);
    this.responsable = poste.responsable ? poste.responsable.nomComplet : 'Aucun Responsable';
  }


  onSubmit(){
    console.log(this.infoCollaborateur.controls);
    console.log("Not Alphabetic: ", this.infoCollaborateur.getError('notalphabetic', 'nomComplet'))
  }

  onCheckReccomondation(value: boolean){
    this.reccomondation = value;
    if(!value){
      this.autreInformation.get('reccommender')?.disable();
      this.autreInformation.get('reccommender')?.addValidators([Validators.required]);
    }
    if(value){
      this.autreInformation.get('reccommender')?.enable();
      this.autreInformation.get('reccommender')?.clearValidators();
    }
  }

  search(query: string){
    this.collaborateurService.searchCollaborateurByNomComplet(query).subscribe({
      next: (data) => {
        this.suggestions = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  postCollaborateur(){
    if(this.infoCollaborateur.invalid || this.qualification.invalid || this.contrat.invalid || this.poste.invalid || this.autreInformation.invalid){
      console.log("info collab form status: ",this.infoCollaborateur.invalid);
      console.log("qualification form status: ",this.qualification.invalid);
      console.log("contrat form status: ",this.contrat.invalid);
      console.log("poste form status: ",this.poste.invalid);
      console.log("autre information form status: ",this.autreInformation.invalid);
      console.log("contrat: ", collectErrors(this.contrat));
      return;
    }
    const collaborateur: ICollaborateurRequest = {
      cin: Number(this.infoCollaborateur.get('cin')?.value),
      nomComplet: this.infoCollaborateur.get('nomComplet')?.value,
      numeroSecuriteSociale: Number(this.infoCollaborateur.get('numSecSocial')?.value),
      dateNaissance: this.infoCollaborateur.get('dateNaissance')?.value,
      numeroTel: Number(String(this.infoCollaborateur.get('numTel')?.value).replace(/\s/g,'')),
      addresse: this.infoCollaborateur.get('adresse')?.value,
      email: this.infoCollaborateur.get('email')?.value,
      qualification: {
        natureQualif_id: this.qualification.get('natureQualif')?.value.id,
        certification: this.qualification.get('certification')?.value,
        niveauQualif_id: this.qualification.get('niveauQualif')?.value.id,
        experience: Number(this.qualification.get('experience')?.value),
      },
      contrat: {
        typeContrat_id: this.contrat.get('typeContrat')?.value.id,
        salaire: this.contrat.get('salaireDeBase')?.value,
        dateDeb: this.contrat.get('typeContrat')?.value.avecDateDebut ? this.contrat.get('dateDebut')?.value : null,
        dateFin: this.contrat.get('typeContrat')?.value.avecDateFin ? this.contrat.get('dateFin')?.value : null,
        avantage_ids: this.contrat.get('avantages')?.value.map((avantage: IAvantage) => {
          return avantage.id;
        }),
      },
      poste_id: this.poste.get('poste')?.value.id,
      commentaire: this.autreInformation.get('comment')?.value,
      reccomender_id: this.reccomondation ? this.autreInformation.get('reccommender')?.value.id : null,
    }
    console.log("Posting Collaborateur...",collaborateur);
    this.collaborateurService.updateCollaborateur(collaborateur, this.collaborateur?.id!).subscribe({
      next: (response) => { 
          console.log("Response: ", response);
          this.enabled = false;
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Collaborateur ajouté avec succès'});
          this.ref?.close();
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Une erreur est survenue'});
      }
    });
  }


  clearAll(){
    this.ref?.close();
  }


  init(){
    this.infoCollaborateur = new FormGroup({
      cin: new FormControl(this.collaborateur?.cin || '', [Validators.required, isMinLength(9), Validators.maxLength(9)]),
      nomComplet: new FormControl(this.collaborateur?.nomComplet || '', [Validators.required, isAlphabetic]),
      numeroCompte: new FormControl('', [Validators.required, isMinLength(9)]),
      numSecSocial: new FormControl(this.collaborateur?.numeroSecuriteSociale || '', [Validators.required]),
      dateNaissance: new FormControl(dayjs(this.collaborateur?.dateNaissance).toDate() || '', [Validators.required, isDate]),
      numTel: new FormControl(this.collaborateur?.numeroTel || '', [Validators.required, isMinLength(11), Validators.maxLength(11)]),
      adresse: new FormControl(this.collaborateur?.addresse || '', [Validators.required]),
      email: new FormControl(this.collaborateur?.email || '', [Validators.required, Validators.email]),
    })


    this.qualification = new FormGroup({
      natureQualif: new FormControl(this.collaborateur?.qualification?.natureQualif || '', [Validators.required, isInArray(this.natureQualif)]),
      certification: new FormControl(this.collaborateur?.qualification?.certification || '', []),
      niveauQualif: new FormControl(this.collaborateur?.qualification?.niveauQualif || '', [Validators.required, isInArray(this.niveauQualif)]),
      experience: new FormControl(this.collaborateur?.qualification?.experience || '', [Validators.required, Validators.min(0)]),
    })

    this.date= dayjs(this.collaborateur?.contrat?.dateDeb).toDate();

    this.contrat = new FormGroup({
      typeContrat: new FormControl(this.collaborateur?.contrat?.typeContrat || '', [Validators.required, isInArray(this.typeContrat)]),
      dateDebut: new FormControl({value: this.collaborateur?.contrat.typeContrat.avecDateDebut ? dayjs(this.collaborateur?.contrat?.dateDeb).toDate() || '' : null, disabled: false}, [ifTrueThenRequired(false), isDate],),
      dateFin: new FormControl({value: this.collaborateur?.contrat.typeContrat.avecDateFin ? dayjs(this.collaborateur?.contrat?.dateFin).toDate() || '': null, disabled: false}, [ifTrueThenRequired(false), isDate],),
      salaireDeBase: new FormControl(this.collaborateur?.contrat?.salaire || '', [Validators.required, Validators.min(0)]),
      avantages: new FormControl({value: [], disabled: false}, []),
    })

    


    this.poste = new FormGroup({
      departement: new FormControl(this.collaborateur?.poste?.typePoste?.departement || '', [Validators.required, isInArray(this.departements)]),
      poste: new FormControl(this.collaborateur?.poste?.typePoste || '', [Validators.required]),
      responsable: new FormControl(this.collaborateur?.poste?.responsable || '', []),
    })

    this.autreInformation = new FormGroup({
      reccommender: new FormControl({value:this.collaborateur?.reccommender, disabled: true}, [ifTrueThenRequired(this.reccomondation)]),
      comment: new FormControl(this.collaborateur?.comment, []),
    })




    this.qualificationService.getAllNatures().subscribe({
      next: (data) => {
        this.natureQualif = data;
        console.log(this.natureQualif);
      },
      error: (err) => {
        console.log(err);
      }
    });


    this.qualificationService.getAllNiveau().subscribe({
      next: (data) => {
        this.niveauQualif = data;
        console.log(this.niveauQualif);
      },
      error: (err) => {
        console.log(err);
      }
    });



    this.contratService.getAllTypesContrat().subscribe({
      next: (data) => {
        this.typeContrat = data;
        this.showDateFin = this.collaborateur?.contrat.typeContrat.avecDateFin!;
        this.disableEnableDates(this.contrat.get('typeContrat'));
        this.updatePJTypes();
        console.log("typeContrat get: ", this.contrat.get("typeContrat")?.value.id)
        this.contratService.getAvantageByTypeContrat(this.contrat.get("typeContrat")?.value.id).subscribe({
          next: (data) => {
            this.avantages = data;
            console.log("Avantages from collab: ", this.collaborateur?.contrat.avantage);
            this.collaborateur?.contrat.avantage.forEach(avantage=>{
              const av = this.avantages.find((a)=> a.id === avantage.id);
              this.contrat.get('avantages')?.value.push(av);
            })
            this.contrat.get('avantages')?.value.push();
            console.log("Avantages from form:", this.contrat.get('avantages')?.value);
            console.log(this.avantages);
          },
          error: (err) => {
            console.log(err);
          }
        });
        console.log(this.typeContrat);
      },
      error: (err) => {
        console.log(err);
      }
    });






    this.posteService.gettAllDepartements().subscribe({
      next: (data) => {
        this.departements = data;
        this.posteService.getTypePosteByDepartement(this.departements[0].id).subscribe({
          next: (data) => {
            this.typePostes = data;
            this.responsable.push(this.collaborateur?.poste.responsable ? this.collaborateur.poste.responsable.nomComplet : 'Aucun Responsable');
            console.log("Poste",data);
          },
          error: (err) => {
            console.log("Poste Err", err);
          }
        });
        console.log(this.departements);
      },
      error: (err) => {
        console.log("Poste err", err);
      }
    });
  }

  upload(event: any){
    for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
  console.log("uploadevent", this.uploadedFiles);
  }

  removeFile(file: any){
    this.uploadedFiles = this.uploadedFiles.filter((f) => {
      return f.name !== file.name;
    });
  }


  updatePJTypes(){
    const typeContrat = this.contrat.get('typeContrat')?.value;
    this.contratService.getPieceJointeByTypeContrat(typeContrat.id).subscribe({
      next: (data) => {
        this.requiredPJs = data;
        console.log("PJs: ",this.requiredPJs);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  clearUploads(){
    this.uploadedFiles = [];
  }

  prettyBytes(bytes: number){
    return prettyBytes(bytes);
  }
}
