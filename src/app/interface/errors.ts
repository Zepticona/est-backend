export interface IErrorSource {
  path: number | string;
  message: string;
}
export interface IGenericErrorResonse {
  statusCode: number;
  message: string;
  errorSources: IErrorSource[];
}
