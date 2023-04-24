import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { BookFileService } from './book-file.service';
import { FileUploadInterceptor } from './file-upload.interseptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';

@Controller('bookfile')
export class BookFileController {
  constructor(private readonly bookFileService: BookFileService) {}

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async downloadBookFile(@Param('id') id: string) {
    return await this.bookFileService.downloadBookFile(id);
  }

  @RolesGuard(Role.Admin)
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @UseInterceptors(FileUploadInterceptor)
  async uploadBookFile(@Param('id') id: string, @UploadedFile() file: Buffer) {
    return await this.bookFileService.uploadBookFile(id, file);
  }
}
