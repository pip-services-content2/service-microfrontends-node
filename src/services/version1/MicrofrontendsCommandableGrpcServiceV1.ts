import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class MicrofrontendsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/microfrontends');
        this._dependencyResolver.put('controller', new Descriptor('service-microfrontends', 'controller', 'default', '*', '*'));
    }
}