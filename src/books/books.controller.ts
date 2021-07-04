import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Book, BookStatus } from './book.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';
import { BookStatusValidationPipe } from './pipes/book-status-validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBooks(@Query(ValidationPipe) filterDto: GetBooksFilterDto): Book[] {
    if (Object.keys(filterDto).length)
      return this.booksService.getBooksWithFilter(filterDto);

    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  getBooksById(@Param('id') id: string): Book {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.createBook(createBookDto);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string): void {
    this.booksService.deleteBook(id);
  }

  @Patch('/:id/status')
  updateBookStatus(
    @Param('id') id: string,
    @Body('status', BookStatusValidationPipe) status: BookStatus,
  ): Book {
    return this.booksService.updateBookStatus(id, status);
  }
}
