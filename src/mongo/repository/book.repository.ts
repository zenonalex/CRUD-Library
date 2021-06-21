import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BookDTO } from "src/dto/books.dto";
import { Book } from "../interfaces/book.interface";

@Injectable()
export class BookRepository {

    constructor(
        @InjectModel('book') private  readonly bookModel: Model<Book>
    ){}

async getAllBooks(): Promise <Book[]>{
    return await this.bookModel.find({},{__v:false}).sort({name:+1}).exec();
}

async saveBook(newBook: BookDTO): Promise<Book>{
    const savedBook = new this.bookModel(newBook);
    return await savedBook.save()
}

async getBookById(bookId : string): Promise<Book>{
    return await this.bookModel.findById(bookId, {__v : false});
}

async getBookByAuthorName(authorName: string[]): Promise<Book[]>{
    return await this.bookModel.find({
        $or : [
            {'author.name':{$in : authorName}},
            {'author.surName':{$in : authorName}},
            {'author.nickName':{$in : authorName}},
        ]
    },{__v:false}).sort({name:+1}).exec()
}

async getBookByName(bookName: string): Promise<Book[]>{
    return await this.bookModel.find({ name : { '$regex' : bookName, '$options' : 'i' } }, { __v : false});
}

async deleteBookById(bookId : string): Promise<Book>{
    return await this.bookModel.findByIdAndDelete({_id: bookId});
}

async updateBookById(bookId : string , updatedBookById: BookDTO) : Promise<Book>{

    return await this.bookModel.findByIdAndUpdate({ _id : bookId }, updatedBookById);
    // return await this.bookModel.replaceOne ({ _id : bookId }, updatedBookById);
}


}