import type { Filters } from "@Core/common/models/types";

import ProductRepository from "../repositories/product.repository";
import ProductEntity from "../entities/product.entity";
import { PaginationDto } from "../../../common/dto/pagination.dto";
import { CommonResponse } from "../../../common/models/types";
import HttpStatusCodes from "@/core/common/lib/http-status-code";
import { BadRequestException } from "@/core/common/lib/errors/exeptions-handler";

class FindProductsUseCase {
  private static instance: FindProductsUseCase;

  private constructor(private readonly productRepository: ProductRepository) {}

  public static getInstance(
    productRepository: ProductRepository
  ): FindProductsUseCase {
    if (!this.instance) {
      this.instance = new FindProductsUseCase(productRepository);
    }
    return this.instance;
  }

  public async execute(
    offSet: number,
    page: number,
    filters?: Filters
  ): Promise<CommonResponse<PaginationDto<ProductEntity> | null>> {
    const products = await this.productRepository.findManyProducts(
      offSet,
      page,
      filters
    );

    const totalItems = await this.productRepository.countProducts(
      filters?.query
    );

    if (!products.data || !totalItems.data) {
      return BadRequestException.exeption("No se encontraron productos");
    }

    const totalPage = Math.ceil(totalItems.data / offSet);

    return {
      statusCode: HttpStatusCodes.OK.code,
      data: {
        items: products.data,
        total: totalItems.data,
        offset: offSet,
        page,
        totalPage,
      },
    };
  }
}

export default FindProductsUseCase;
