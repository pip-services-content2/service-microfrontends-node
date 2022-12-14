import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-nodex';

import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
import { IMicrofrontendsPersistence } from './IMicrofrontendsPersistence';

export class MicrofrontendsMemoryPersistence 
    extends IdentifiableMemoryPersistence<MicrofrontendV1, string> 
    implements IMicrofrontendsPersistence {

    constructor() {
        super();
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: MicrofrontendV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.name, search))
            return true;
        if (this.matchString(item.description, search))
            return true;
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let exposed_module = filter.getAsNullableString('exposed_module');
                
        return (item: MicrofrontendV1) => {
            if (search && !this.matchSearch(item, search)) 
                return false;
            if (id && item.id != id) 
                return false;
            if (type && item.type != type) 
                return false;
            if (exposed_module && item.exposed_module != exposed_module) 
                return false;
            return true; 
        };
    }

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
