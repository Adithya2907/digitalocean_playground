import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BookStatus } from '../book.model';

export class BookStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    BookStatus.NOT_READ,
    BookStatus.READING,
    BookStatus.READ,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value))
      throw new BadRequestException(`${value} is an invalid status`);

    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
