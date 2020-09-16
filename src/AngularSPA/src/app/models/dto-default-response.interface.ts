export interface DtoDefaultResponse {
  responseCode: number;
  responseMessage: string;
}

export class DtoDefaultResponseModel implements DtoDefaultResponse {
  responseCode: number;
  responseMessage: string;
}
