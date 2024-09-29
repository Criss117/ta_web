import type { Filters } from "@Core/common/models/types";
import { BadRequestException } from "@Core/common/errors/expetions";

import ProductRepository from "../repositories/product.repository";
import ProductEntity from "../entities/product.entity";
import { PaginationDto } from "../../../common/dto/pagination.dto";

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
  ): Promise<PaginationDto<ProductEntity>> {
    const products = await this.productRepository.findManyProducts(
      offSet,
      page,
      filters
    );

    const totalItems = await this.productRepository.countProducts(
      filters?.query
    );

    if (totalItems === 0) {
      throw new BadRequestException("No clients found");
    }

    const totalPage = Math.ceil(totalItems / offSet);

    return {
      items: products,
      total: totalItems,
      offset: offSet,
      page,
      totalPage,
    };
  }
}

export default FindProductsUseCase;
