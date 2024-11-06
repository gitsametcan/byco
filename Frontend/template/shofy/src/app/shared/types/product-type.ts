type IReview = {
  user?:string;
  name:string;
  email:string;
  rating:number;
  review:string;
  date:string;
}

export interface IProduct{
    id:number,
    ad: string,
    kategori: string,
    img: string,
    kod: string,
    aciklama: string,

    amper: string,
    aydinlatmaTuru: string,
    cerceve: string,
    damarSayisi: string,

    disKilifRengi: string,
    duy: string,
    isikRengi: string,
    kabloTipi: string,

    kabloUzunlugu: string,
    kanalBoyutu: string,
    kanalOzelligi: string,
    kanalRengi: string,

    kasaRengi: string,
    kesit: string,
    kesmeKapasitesi: string,
    kullanimYeri: string,

    kutup: string,
    marka: string,
    model: string,
    prizSayisi: string,

    renk: string,
    renkSicakligiKelvin: string,
    sigortaSayisi: string,
    tip: string,

    tur: string,
    urun: string,
    urunOzelligi: string,
    urunTipi: string,

    watt: string,
    stok: number,
    fiyat: number,
    indirim: number,
    orderQuantity?: number
    durum?: string,
    parent?: string,
    children?: string,
}

// export interface IProduct {
//   id: string;
//   sku: string;
//   img: string;
//   title: string;
//   slug: string;
//   unit: string;
//   imageURLs: {
//     color?: {
//       name: string;
//       clrCode: string;
//     };
//     img: string;
//   }[];
//   parent: string;
//   children: string;
//   price: number;
//   discount: number;
//   quantity: number;
//   brand: {
//     name: string;
//   };
//   category: {
//     name: string;
//   };
//   status: string;
//   reviews?: IReview[];
//   productType: string;
//   description: string;
//   orderQuantity?: number;
//   additionalInformation: {
//     key: string;
//     value: string;
//   }[];
//   featured?: boolean;
//   sellCount: number;
//   offerDate?:{
//     startDate:string;
//     endDate:string;
//   }
//   tags?: string[];
//   videoId?:string;
//   sizes?:string[];
// }