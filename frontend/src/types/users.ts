export interface CreateIndividualData {
  custName: string;
  custId: string;
  custPw: string;
  hpNo: string;
  email: string;
  birthDate?: string;
  custAddr?: string;
  role?: string; // Optional - backend will default to "INDIVIDUAL"
}

export interface CreateBusinessData {
  custName: string;
  custId: string;
  custPw: string;
  reprsntName: string;
  corpRegNo: string;
  corpTellNo: string;
  bnsmRegNo: string;
  bnsmRegCert?: string;
  corpFaxNo?: string;
  corpEmail?: string;
  custRep: string;
  custRepPhone: string;
  repDepTit?: string;
  birthDate?: string;
  custAddr?: string;
  role?: string; // Optional - backend will default to "BUSINESS"
}

export interface CreateAgencyData {
  custName: string;
  custId: string;
  custPw: string;
  reprsntName: string;
  corpRegNo: string;
  corpTellNo: string;
  bnsmRegNo: string;
  bnsmRegCert?: string;
  corpFaxNo?: string;
  corpEmail?: string;
  custRep: string;
  custRepPhone: string;
  repDepTit?: string;
  birthDate?: string;
  custAddr?: string;
  role?: string; // Optional - backend will default to "AGENCY"
}