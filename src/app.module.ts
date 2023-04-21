import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsService } from './authors/authors.service';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [AuthorsModule, GenresModule],
  controllers: [AppController, AuthorsController],
  providers: [AppService, AuthorsService],
})
export class AppModule {}
