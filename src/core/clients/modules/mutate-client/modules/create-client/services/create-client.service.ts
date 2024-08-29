import { ClientForm, MutateClientReturnType } from "../../../models/type";
import { createClient } from "../actions/create-client.action";

export class CreateClientService {
  private client: ClientForm;

  constructor(client: ClientForm) {
    this.client = client;
  }

  async execute(): Promise<MutateClientReturnType> {
    return await createClient(this.client);
  }
}
