import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookStatus } from './book.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-books-filter.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBooksWithFilter(filterDto: GetBooksFilterDto): Book[] {
    const { status, search } = filterDto;
    let books = this.getAllBooks();

    if (status) books = books.filter((book) => book.status === status);
    if (search)
      books = books.filter(
        (book) => book.author.includes(search) || book.title.includes(search),
      );

    return books;
  }

  getBookById(id: string): Book {
    const found = this.books.find((b) => b.id === id);

    if (!found) throw new NotFoundException(`Book with ID ${id} not found`);

    return found;
  }

  createBook(createBookDto: CreateBookDto): Book {
    const { title, author } = createBookDto;

    const book: Book = {
      id: uuidv4(),
      title,
      author,
      status: BookStatus.NOT_READ,
    };

    this.books.push(book);

    return book;
  }

  deleteBook(id: string): void {
    const found = this.getBookById(id);
    this.books = this.books.filter((b) => b.id !== found.id);
  }

  updateBookStatus(id: string, status: BookStatus): Book {
    const book = this.getBookById(id);
    book.status = status;
    return book;
  }
}
