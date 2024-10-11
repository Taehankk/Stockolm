export interface StockInfo {
  corpCode: string;
  corpName: string;
  stockCode: string;
  ceoName: string;
  address: string;
  url: string;
  phoneNumber: string;
  faxNumber: string;
  cpta: string;
  papr: string;
  bps: string;
  eps: string;
  roeVal: string;
  ntinInrt: string;
  bsopPrfiInrt: string;
  grs: string;
}

export interface Analyst {
  analystName: string;
  analystNickname: string;
  userImagePath: string;
  reliability: number;
  accuracy: number;
  analystBoardId: number;
  goalDate: string;
  opinion: string;
  goalStock: string;
}
