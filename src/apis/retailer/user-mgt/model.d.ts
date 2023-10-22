import {ERequestMethod} from '@/enums/request.enum';

declare global {
  namespace RETAIL {
    type hihi = {
      he?: number;
      status: `${ERequestMethod}`
    }
  }
}
export {}