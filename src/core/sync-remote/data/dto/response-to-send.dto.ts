import { SyncState } from "../../domain/interfaces/sync-remote";

interface ResponseToSendDto {
  syncId: number;
  state: SyncState;
  error: string | null;
}

export default ResponseToSendDto;
