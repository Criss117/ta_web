import ProductsSaleRepositoryImpl from "../data/repositories/products-sale.repository.impl";
import FindByTicketUseCase from "../domain/usecases/find-by-ticket.usecase";

class ProductsSaleUseCasesFactory {
  private static productsSaleRepository =
    ProductsSaleRepositoryImpl.getInstance();

  static createFindByTicketUseCase() {
    return new FindByTicketUseCase(this.productsSaleRepository);
  }
}

export default ProductsSaleUseCasesFactory;
