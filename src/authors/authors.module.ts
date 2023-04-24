import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entity/author.entity';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  exports: [AuthorsService],
})
export class AuthorsModule {}
