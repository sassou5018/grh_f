import { IDepartement } from "./IDepartement";

export interface ITypePoste {
    id: number;
    libelle: string;
    isResponsable: boolean;
    departement: IDepartement;
}
