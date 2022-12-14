import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';
import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
import { IMicrofrontendsPersistence } from './IMicrofrontendsPersistence';
export declare class MicrofrontendsMongoDbPersistence extends IdentifiableMongoDbPersistence<MicrofrontendV1, string> implements IMicrofrontendsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>>;
}
