import {
  Injectable,
  HttpException,
  HttpStatus,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookFileEntity } from './entity/book-file.entity';
import { BooksService } from 'src/books/books.service';
import { BookDto } from 'src/books/dto/book.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class BookFileService {
  constructor(
    @InjectRepository(BookFileEntity)
    private filesRepository: Repository<BookFileEntity>,
    private readonly bookService: BooksService,
  ) {}

  async downloadBookFile(bookId: string) {
    const book: BookDto = await this.bookService.getBook(bookId);
    const bookFile = await this.getFileById(book.bookFileId);
    const file = createReadStream(join(process.cwd(), bookFile.path));
    return new StreamableFile(file);
  }

  async uploadBookFile(bookId: string, file: Buffer) {
    const bookFile: BookFileEntity = await this.uploadFile(file);
    let book: BookDto = await this.bookService.getBook(bookId);

    book = {
      ...book,
      bookFileId: bookFile.id,
    };
    await this.bookService.updateBook(book.id, book);
    return bookFile;
  }

  async uploadFile(file: any) {
    const newFile = this.filesRepository.create({
      filename: file.filename,
      path: file.path,
    });
    await this.filesRepository.save(newFile);
    return newFile;
  }

  async getFileById(id: string) {
    const file = await this.filesRepository.findOne({ where: { id } });
    if (!file) {
      throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
    }
    return file;
  }
}
