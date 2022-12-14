import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class MicrofrontendsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/microfrontends');
        this._dependencyResolver.put('controller', new Descriptor('service-microfrontends', 'controller', 'default', '*', '1.0'));
    }
}