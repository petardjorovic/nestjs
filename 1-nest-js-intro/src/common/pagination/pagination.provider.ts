import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Pagination } from './pagination.interface';
import { type Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  public async paginationQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<Pagination<T>> {
    const findOptions: FindManyOptions<T> = {
      skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
      take: paginationQueryDto.limit,
    };

    if (where) findOptions.where = where;
    if (relations) findOptions.relations = relations;

    const data = await repository.find(findOptions);
    const totalItems = await repository.count({ where });

    const currentPage = paginationQueryDto.page;
    const lastPage = Math.ceil(totalItems / paginationQueryDto.limit);
    const nextPage = currentPage === lastPage ? lastPage : currentPage + 1;
    const previousPage = currentPage === 1 ? 1 : currentPage - 1;

    const baseUrl = `${this.request.protocol}://${this.request.host}`;
    const newUrl = new URL(this.request.originalUrl, baseUrl);

    const reponse: Pagination<T> = {
      data,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems,
        currentPage: paginationQueryDto.page,
        totalPages: Math.ceil(totalItems / paginationQueryDto.limit),
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${lastPage}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${currentPage}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${previousPage}`,
      },
    };

    return reponse;
  }
}
