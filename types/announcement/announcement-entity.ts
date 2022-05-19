export interface AnnouncementEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;
}


export interface NewAnnouncementEntity extends Omit<AnnouncementEntity, 'id'> {
  id?: string;
}