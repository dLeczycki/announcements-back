import { FieldPacket } from "mysql2";
import { AnnouncementEntity, NewAnnouncementEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

type AnnouncementRecordResults = [AnnouncementEntity[], FieldPacket[]];

export class AnnouncementRecord implements AnnouncementEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(obj: NewAnnouncementEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError('Announcement name must not be empty and cannot exceed 100 characters.');
    }

    if (obj.description.length > 1024) {
      throw new ValidationError('Announcement description cannot exceed 1000 characters.');
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError('Announcement price cannot be less than 0 or greater than 9 999 999.');
    }

    //TODO: Check if URL is valid
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError('Announcement link cannnot be empty and cannot exceed 100 characters.');
    }

    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError('Announcement cannot be located.');
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }

  static async getOne(id: string): Promise<AnnouncementRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `announcements` WHERE id = :id", { id: id }) as AnnouncementRecordResults;

    return results.length === 0 ? null : new AnnouncementRecord(results[0]);
  }
}