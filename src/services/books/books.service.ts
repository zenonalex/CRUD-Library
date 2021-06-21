import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/dto/books.dto';
import { Book } from 'src/mongo/interfaces/book.interface';
import { BookRepository } from 'src/mongo/repository/book.repository';

@Injectable()
export class BooksService {

    constructor(
        private readonly bookRepository: BookRepository
    ){}

    async getAllBooks(): Promise <Book[]>{
        const allBooks = await this.bookRepository.getAllBooks();

        if(!allBooks.length) 
            throw new BadRequestException('Deu ruim na requisição');
        

        return allBooks;
    }
    
    async saveBook(newBook: BookDTO): Promise<Book>{

        return await this.bookRepository.saveBook(newBook)
        
    }

    async getBookById(bookId : string) : Promise<Book>{

        try {
            const result = await this.bookRepository.getBookById(bookId)

            if(!result){
                throw new BadRequestException('There are no results')
            }

            return result
            
        } catch (error) {
            throw new BadRequestException('There are no results')
        }
    }

    async getBookByAuthorName(authorName: string): Promise<Book[]>{

        const splitedAuthorName = authorName.split(' ');

        try {
            return await this.bookRepository.getBookByAuthorName(splitedAuthorName);
        } catch (error) {
            throw new BadRequestException('Error to find this book')
        }
    }

    async getBookByName(name: string): Promise<Book[]>{

        try {
            return await this.bookRepository.getBookByName(name);
        } catch (error) {
            throw new BadRequestException('Error to find this book')
        }
    }

    async deleteBookById(bookId : string) : Promise<Book>{

        try {
            return await this.bookRepository.deleteBookById(bookId)
        } catch (error) {
            throw new BadRequestException('This book does not exist')
        }
    }

    async updateBookById(bookId : string, updatedBookById: BookDTO) : Promise<Book>{

        const resultId = await this.bookRepository.getBookById(bookId)

        if(!resultId){
            throw new BadRequestException('There are no results with this id')
        }

        const result = this.bookRepository.updateBookById(bookId, updatedBookById);

        if(!result)
            throw new BadRequestException('Error in update');
        else
            return this.bookRepository.getBookById(bookId);

    }

}
