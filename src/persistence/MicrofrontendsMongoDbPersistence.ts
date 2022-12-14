let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
import { IMicrofrontendsPersistence } from './IMicrofrontendsPersistence';

export class MicrofrontendsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<MicrofrontendV1, string>
    implements IMicrofrontendsPersistence {

    constructor() {
        super('microfrontends');
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ name: { $regex: searchRegex } });
            searchCriteria.push({ description: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });

        let exposed_module = filter.getAsNullableString('exposed_module');
        if (exposed_module != null)
            criteria.push({ exposed_module: exposed_module });
                
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
