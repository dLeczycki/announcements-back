import { Router } from "express";
import { AnnouncementRecord } from "../records/announcement.record";

export const announcementRoutes = Router();

announcementRoutes
  .get('/search/:name?', async (req, res) => {
    const announcements = await AnnouncementRecord.getAll(req.params.name ?? '');
    return res.json(announcements);
  })

  .get('/:id', async (req, res) => {
    const announcement = await AnnouncementRecord.getOne(req.params.id);
    return res.json(announcement);
  })

  .post('/', async (req, res) => {
    const announcement = new AnnouncementRecord(req.body);
    await announcement.insert();
    res.json(announcement);
  })