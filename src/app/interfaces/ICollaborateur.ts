import { ITypePoste } from "./ITypePoste";

export interface ICollaborateur {
    id: number;
    cin: number;
    dateNaissance: string;
    addresse: string;
    nomComplet: string;
    numeroSecuriteSociale: number;
    numeroTel: number;
    email: string;
    qualification: {
        id: number;
        experience: number;
        certification: string;
        natureQualif: {
            id: number;
            libelle: string;
        };
        niveauQualif: {
            id: number;
            libelle: string;
        };
    };
    poste: {
        id: number;
        typePoste: {
            id: number;
            libelle: string;
            isResponsable: boolean;
            departement: {
                id: number;
                libelle: string;
            };
        };
        responsable: {
            id: number;
            cin: number;
            dateNaissance: string;
            addresse: string;
            nomComplet: string;
            numeroSecuriteSociale: number;
            numeroTel: number;
            email: string;
            comment: string;
        };
    };
    contrat: {
        id: number;
        salaire: number;
        dateDeb: string;
        dateFin: string;
        typeContrat: {
            id: number;
            libelle: string;
            salaireDeBase: number;
            avecDateFin: boolean;
            avecDateDebut: boolean;
        };
        avantage: {
            id: number;
            libelle: string;
            montant: number;
        }[];
    };
    reccommender: {
        id: number;
        cin: number;
        dateNaissance: string;
        addresse: string;
        nomComplet: string;
        numeroSecuriteSociale: number;
        numeroTel: number;
        email: string;
        comment: string;
    };
    comment: string;
    dateEmbauche: Date;
}


    
export interface ICollaborateurRequest {
    cin: number;
    dateNaissance: string;
    addresse: string;
    nomComplet: string;
    numeroSecuriteSociale: number;
    numeroTel: number;
    email: string;
    qualification: {
        experience: number;
        certification: string;
        natureQualif_id: number;
        niveauQualif_id: number;
    };
    poste_id: number; 
    contrat: {
        salaire: number;
        dateDeb: Date;
        dateFin: Date;
        typeContrat_id: number;
        avantage_ids: number[];
    };
    reccomender_id: string;
    commentaire: string;
}


