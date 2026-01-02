import { PaginationProvider } from './pagination.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [PaginationProvider],
  exports: [PaginationProvider],
})
export class PaginationModule {}
