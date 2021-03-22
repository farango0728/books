import Hapi from '@hapi/hapi';
import config from '../../config';
import { Status} from './types';

export async function getStatus(req: Hapi.request): Promise<Status> {
  return {
    module: config.project.name,
    api: true,
    database: req?.server?.app?.connection?.isConnected || false
  };
}