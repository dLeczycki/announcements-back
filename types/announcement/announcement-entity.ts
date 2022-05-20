export interface SimpleAnnouncementEntity {
  id: string;
  lat: number;
  lon: number;
}

export interface AnnouncementEntity extends SimpleAnnouncementEntity {
  name: string;
  description: string;
  price: number;
  url: string;
}


export interface NewAnnouncementEntity extends Omit<AnnouncementEntity, 'id'> {
  id?: string;
}
