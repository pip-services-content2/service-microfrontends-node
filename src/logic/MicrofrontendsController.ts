import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { MicrofrontendV1 } from '../data/version1/MicrofrontendV1';
import { IMicrofrontendsPersistence } from '../persistence/IMicrofrontendsPersistence';
import { IMicrofrontendsController } from './IMicrofrontendsController';
import { MicrofrontendsCommandSet } from './MicrofrontendsCommandSet';

export class MicrofrontendsController implements  IConfigurable, IReferenceable, ICommandable, IMicrofrontendsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-microfrontends:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(MicrofrontendsController._defaultConfig);
    private _persistence: IMicrofrontendsPersistence;
    private _commandSet: MicrofrontendsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IMicrofrontendsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new MicrofrontendsCommandSet(this);
        return this._commandSet;
    }
    
    public async getMicrofrontends(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<MicrofrontendV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getMicrofrontendById(correlationId: string, id: string): Promise<MicrofrontendV1> {
        return await this._persistence.getOneById(correlationId, id);        
    }

    public async createMicrofrontend(correlationId: string, microfrontend: MicrofrontendV1): Promise<MicrofrontendV1> {
        return await this._persistence.create(correlationId, microfrontend);
    }

    public async updateMicrofrontend(correlationId: string, microfrontend: MicrofrontendV1): Promise<MicrofrontendV1> {
        return await this._persistence.update(correlationId, microfrontend);
    }

    public async deleteMicrofrontendById(correlationId: string, id: string): Promise<MicrofrontendV1> {  
        return await this._persistence.deleteById(correlationId, id);
    }

}
