import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';
import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
import { IMicrofrontendsPersistence } from './IMicrofrontendsPersistence';
export declare class MicrofrontendsMemoryPersistence extends IdentifiableMemoryPersistence<MicrofrontendV1, string> implements IMicrofrontendsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>>;
}
