import { ITypePoste } from "./ITypePoste";

export interface IPoste {
    id: number;
    typePoste: ITypePoste;
    responsable?: {
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
}
