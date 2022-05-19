import { AnnouncementRecord } from "../records/announcement.record";


test('AnnouncementRecord returns data from database for one entry', async () => {
  const announcement = await AnnouncementRecord.getOne('test-index');

  console.log(announcement);

  expect(announcement).toBeDefined();
  expect(announcement.id).toBe('test-index');
  expect(announcement.name).toBe('My announcement');
});

test('AnnouncementRecord returns null from database for unexisting entry', async () => {
  const announcement = await AnnouncementRecord.getOne('---');

  expect(announcement).toBeNull();
});