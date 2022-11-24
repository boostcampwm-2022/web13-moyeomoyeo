import {
  convert,
  DateTimeFormatter,
  LocalDateTime,
  ZoneId,
} from '@js-joda/core';

export const toDate = (date: LocalDateTime): Date => {
  return convert(date, ZoneId.UTC).toDate();
};

export const toLocalDateTime = (date: Date): LocalDateTime => {
  return LocalDateTime.parse(
    date.toISOString(),
    DateTimeFormatter.ISO_ZONED_DATE_TIME,
  );
};
