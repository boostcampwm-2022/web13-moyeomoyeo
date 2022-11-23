import { DateTimeFormatter, LocalDateTime } from '@js-joda/core';
import { toDate, toLocalDateTime } from '../date-time';

describe('Date Time Utils Test', () => {
  describe('toDate', () => {
    test('LocalDateTime to Date', async () => {
      // given
      const dateString = '2022-09-01T15:00:00.000Z';
      const localDateTime = LocalDateTime.parse(
        dateString,
        DateTimeFormatter.ISO_ZONED_DATE_TIME,
      );

      // when
      const date = toDate(localDateTime);

      // then
      expect(date).toEqual(new Date(dateString));
      expect(date.toISOString()).toEqual(dateString);
    });
  });

  describe('toLocalDateTime', () => {
    test('Date To LocalDateTime', async () => {
      // given
      const dateString = '2022-09-01T15:00:00.000Z';
      const date = new Date(dateString);

      // when
      const localDateTime = toLocalDateTime(date);

      // then
      expect(localDateTime).toEqual(
        LocalDateTime.parse(dateString, DateTimeFormatter.ISO_ZONED_DATE_TIME),
      );
    });
  });
});
