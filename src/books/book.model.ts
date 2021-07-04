export class Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
}

export enum BookStatus {
  NOT_READ = 'NOT_READ',
  READING = 'READING',
  READ = 'READ',
}
