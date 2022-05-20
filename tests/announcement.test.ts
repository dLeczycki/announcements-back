import { AnnouncementRecord } from "../records/announcement.record";
import { AnnouncementEntity } from "../types";
import { pool } from "../utils/db";

const defaultObj = {
  name: 'Test name',
  description: 'blah',
  url: 'https://link.to.buy.product',
  price: 0,
  lat: 9,
  lon: 9,
}

afterAll(async () => {
  await pool.end();
})

test('AnnouncementRecord returns data from database for one entry', async () => {
  const announcement = await AnnouncementRecord.getOne('test-index');

  expect(announcement).toBeDefined();
  expect(announcement.id).toBe('test-index');
  expect(announcement.name).toBe('My announcement');
});

test('AnnouncementRecord returns null from database for unexisting entry', async () => {
  const announcement = await AnnouncementRecord.getOne('---');

  expect(announcement).toBeNull();
});

test('AnnouncementRecord.getAll returns array for found entries', async () => {
  const announcements = await AnnouncementRecord.getAll('');

  expect(announcements).toBeInstanceOf(Array);
  expect(announcements).not.toEqual([]);
});

test('AnnouncementRecord.getAll returns small amount of data', async () => {
  const announcements = await AnnouncementRecord.getAll('');

  expect((announcements[0] as AnnouncementEntity).price).toBeUndefined();
  expect((announcements[0] as AnnouncementEntity).description).toBeUndefined();
});

test('AnnouncementRecord.insert returns UUID', async () => {
  const announcement = new AnnouncementRecord(defaultObj);

  await announcement.insert();

  expect(announcement.id).toBeDefined();
  expect(typeof announcement.id).toBe('string');
});

test('AnnouncementRecord.insert inserts data to database', async () => {
  const announcement = new AnnouncementRecord(defaultObj);

  await announcement.insert();

  const foundAnnouncement = await AnnouncementRecord.getOne(announcement.id);

  expect(foundAnnouncement).toBeDefined();
  expect(foundAnnouncement.id).toBe(announcement.id);
});