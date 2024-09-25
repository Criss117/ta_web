import ClientEntity from "./client.entity";

class DebtPaymentEntity {
  public id: number = -1;
  public amount: number = -1;
  public clientId: number = -1;
  public client: ClientEntity | null = null;
  public createdAt: Date | null = null;
  public updatedAt: Date | null = null;
  public deletedAt: Date | null = null;
  public isActive: boolean = false;

  public static builder() {
    return new DebtPaymentEntityBuilder();
  }
}

class DebtPaymentEntityBuilder {
  private debtPaymentEntity = new DebtPaymentEntity();

  public id(id: number) {
    this.debtPaymentEntity.id = id;
    return this;
  }

  public amount(amount: number) {
    this.debtPaymentEntity.amount = amount;
    return this;
  }

  public clientId(clientId: number) {
    this.debtPaymentEntity.clientId = clientId;
    return this;
  }

  public client(client: ClientEntity | null) {
    this.debtPaymentEntity.client = client;
    return this;
  }

  public createdAt(createdAt: Date | null) {
    this.debtPaymentEntity.createdAt = createdAt;
    return this;
  }

  public updatedAt(updatedAt: Date | null) {
    this.debtPaymentEntity.updatedAt = updatedAt;
    return this;
  }

  public deletedAt(deletedAt: Date | null) {
    this.debtPaymentEntity.deletedAt = deletedAt;
    return this;
  }

  public isActive(isActive: boolean) {
    this.debtPaymentEntity.isActive = isActive;
    return this;
  }

  public build() {
    return this.debtPaymentEntity;
  }
}

export default DebtPaymentEntity;
