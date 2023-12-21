export interface IAvantage {
    id: number;
    libelle: string;
    montant: number;
    typeContrat: {
        id: number;
        libelle: string;
        salaireDeBase: number;
        avecDateFin: boolean;
        avecDateDebut: boolean;
    };
}
