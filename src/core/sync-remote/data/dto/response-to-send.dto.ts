import { SyncState } from "../../domain/interfaces/sync-remote";

interface ResponseToSendDto {
  syncId: string;
  state: SyncState;
  error: string | null;
}

export default ResponseToSendDto;
