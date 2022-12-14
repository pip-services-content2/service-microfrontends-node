import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';

import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';

export interface IMicrofrontendsPersistence extends IGetter<MicrofrontendV1, string>, IWriter<MicrofrontendV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>>;

    getOneById(correlationId: string, id: string): Promise<MicrofrontendV1>;

    create(correlationId: string, item: MicrofrontendV1): Promise<MicrofrontendV1>;

    update(correlationId: string, item: MicrofrontendV1): Promise<MicrofrontendV1>;

    deleteById(correlationId: string, id: string): Promise<MicrofrontendV1>;
}
