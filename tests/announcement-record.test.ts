import { AnnouncementRecord } from "../records/announcement.record";

const defaultObj = {
  name: 'Test name',
  description: 'blah',
  url: 'https://link.to.buy.product',
  price: 0,
  lat: 9,
  lon: 9,
}

test('Can build announcement record', () => {
  const announcement = new AnnouncementRecord(defaultObj);

  expect(announcement.name).toBe('Test name');
  expect(announcement.description).toBe('blah');
});

test('Validates invalid name', () => {
  expect(() => new AnnouncementRecord({
    ...defaultObj,
    name: undefined,
  })).toThrow('Announcement name must not be empty and cannot exceed 100 characters.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    name: null,
  })).toThrow('Announcement name must not be empty and cannot exceed 100 characters.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    name: '',
  })).toThrow('Announcement name must not be empty and cannot exceed 100 characters.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    name: 'It is truly very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long name',
  })).toThrow('Announcement name must not be empty and cannot exceed 100 characters.');
});

test('Validates invalid description', () => {
  expect(() => new AnnouncementRecord({
    ...defaultObj,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus odio nec metus feugiat, tristique tincidunt eros tempor. Vestibulum viverra placerat bibendum. Aenean justo leo, posuere id dui id, bibendum hendrerit sapien. Fusce vel risus eget velit dignissim eleifend. Vestibulum id erat urna. Aliquam ligula sapien, venenatis vel leo vitae, porta luctus ipsum. Etiam tempor interdum dui et mattis. Nullam volutpat, dui vel pharetra euismod, justo nulla tincidunt tellus, bibendum volutpat metus risus ac nibh. Praesent quis felis scelerisque, pulvinar massa eu, placerat ligula. Sed massa tortor, venenatis quis dignissim a, consequat ac lorem. Nullam pellentesque leo eget leo gravida fermentum. Curabitur eros ligula, facilisis nec turpis in, efficitur elementum erat. Quisque malesuada blandit sapien, eget pulvinar ipsum tincidunt et. Nam consectetur tempus augue at hendrerit. Aliquam vulputate venenatis risus, ut facilisis libero auctor id. Maecenas placerat auctor purus.  Nunc ex sapien, ultricies in viverra id, dictum eu nulla. Etiam quis euismod odio. Praesent eros ipsum, scelerisque volutpat tristique non, ullamcorper efficitur nunc. Fusce vitae arcu ut tortor semper sagittis tempus sollicitudin ipsum. Fusce mollis ultrices dolor, et facilisis leo mattis non. Curabitur sed rhoncus justo, eget scelerisque tellus. Sed gravida eu nibh eu rutrum. Sed gravida ipsum ut ipsum.'
  })).toThrow('Announcement description cannot exceed 1000 characters.');
});

test('Validates invalid price', () => {
  expect(() => new AnnouncementRecord({
    ...defaultObj,
    price: -3,
  })).toThrow('Announcement price cannot be less than 0 or greater than 9 999 999.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    price: 10000000,
  })).toThrow('Announcement price cannot be less than 0 or greater than 9 999 999.');
});

test('Validates invalid url', () => {
  expect(() => new AnnouncementRecord({
    ...defaultObj,
    url: '',
  })).toThrow('Announcement link cannnot be empty and cannot exceed 100 characters.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    url: undefined,
  })).toThrow('Announcement link cannnot be empty and cannot exceed 100 characters.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    url: null,
  })).toThrow('Announcement link cannnot be empty and cannot exceed 100 characters.');

  expect(() => new AnnouncementRecord({
    ...defaultObj,
    url: 'Very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long URL',
  })).toThrow('Announcement link cannnot be empty and cannot exceed 100 characters.');
});