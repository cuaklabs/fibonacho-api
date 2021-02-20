import { ServerInfo } from '../models/domain/ServerInfo';

export interface GetServerInfoAdapter {
  getServerInfo(): Promise<ServerInfo>;
}
