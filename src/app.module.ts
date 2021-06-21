import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './controllers/books/books.controller';
import { BookRepository } from './mongo/repository/book.repository';
import { BookSchema } from './mongo/schemas/book.schema';
import { BooksService } from './services/books/books.service';


@Module({
  imports: [

    MongooseModule.forRoot('mongodb://localhost/biblioteca',{useNewUrlParser:true, useUnifiedTopology:true}),

    MongooseModule.forFeature([
      {name : 'book', schema: BookSchema}
    ])

  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class AppModule {}
