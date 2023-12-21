export interface IPieceJointeType {
    id: number;
    libelle: string;
    typeContrat: {
        id: number;
        libelle: string;
        salaireDeBase: number;
        avecDateFin: boolean;
        avecDateDebut: boolean;
    };
}
