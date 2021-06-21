import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BooksService } from 'src/services/books/books.service';
import {BookDTO} from '../../dto/books.dto';

@Controller('books')
export class BooksController {

    constructor(
        private readonly bookService: BooksService
    ){}

    @Get()
    async getAllBooks(): Promise <Book[]> {
        return await this.bookService.getAllBooks();
    }

    @Get('id/:bookId')
    async getBookById(@Param('bookId') bookId : string) : Promise<Book>{
        return await this.bookService.getBookById(bookId);
    }

    @Get('author/:authorName')
    async getBookByAuthorName(@Param('authorName') authorName: string): Promise<Book[]>{
        return await this.bookService.getBookByAuthorName(authorName);
    
    }
    @Get('name/:name')
    async getBookByName(@Param('name') name: string): Promise<Book[]>{
        return await this.bookService.getBookByName(name);
    }

    @Post()
    async savedBook(@Body() newBook: BookDTO): Promise<Book>{
        return await this.bookService.saveBook(newBook);
    }

    @Patch(':bookId')
    async updateBookById(@Param('bookId') bookId : string, @Body() updatedBook : BookDTO) : Promise<Book>{
        return await this.bookService.updateBookById(bookId, updatedBook);
    }

    @Delete(':bookId')
    async deleteBookById(@Param('bookId') bookId : string): Promise<Book>{
        return await this.bookService.deleteBookById(bookId);
    }
}
