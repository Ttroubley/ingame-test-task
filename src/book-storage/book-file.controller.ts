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
import { Roles } from '../auth/roles-guard/roles.decorator';
import { Role } from 'src/auth/roles-guard/roles.enum';
import { RolesGuard } from 'src/auth/roles-guard/role.guard';

@Controller('bookfile')
export class BookFileController {
  constructor(private readonly bookFileService: BookFileService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async downloadBookFile(@Param('id') id: string) {
    return await this.bookFileService.downloadBookFile(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id')
  @UseInterceptors(FileUploadInterceptor)
  async uploadBookFile(@Param('id') id: string, @UploadedFile() file: Buffer) {
    return await this.bookFileService.uploadBookFile(id, file);
  }
}
