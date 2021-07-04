import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { BookStatus } from '../book.model';

export class GetBooksFilterDto {
  @IsOptional()
  @IsIn([BookStatus.NOT_READ, BookStatus.READ, BookStatus.READING])
  status: BookStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
