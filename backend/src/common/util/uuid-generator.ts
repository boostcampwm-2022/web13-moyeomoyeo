import { randomUUID } from 'crypto';

export class UuidGenerator {
  static generate(length?: number): string {
    const result = randomUUID();

    if (length && length > 0) {
      return result.substring(0, length);
    }

    return result;
  }
}
