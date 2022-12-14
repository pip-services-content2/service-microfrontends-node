import { DataPage } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { MicrofrontendV1 } from '../../data/version1/MicrofrontendV1';
export declare class MicrofrontendsGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromPagingParams(paging: PagingParams): any;
    static toPagingParams(obj: any): PagingParams;
    static fromMicrofrontend(microfrontend: MicrofrontendV1): any;
    static toMicrofrontend(obj: any): MicrofrontendV1;
    static fromMicrofrontendPage(page: DataPage<MicrofrontendV1>): any;
    static toMicrofrontendPage(obj: any): DataPage<MicrofrontendV1>;
}
