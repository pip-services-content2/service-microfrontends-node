import { IReferences } from 'pip-services3-commons-nodex';
import { ProcessContainer } from 'pip-services3-container-nodex';

import { MicrofrontendsServiceFactory } from '../build/MicrofrontendsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class MicrofrontendsProcess extends ProcessContainer {

    public constructor() {
        super("microfrontends", "Microfrontends microservice");
        this._factories.add(new MicrofrontendsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
