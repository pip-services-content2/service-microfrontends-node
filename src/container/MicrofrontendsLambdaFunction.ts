import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { MicrofrontendsServiceFactory } from '../build/MicrofrontendsServiceFactory';

export class MicrofrontendsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("microfrontends", "Microfrontends function");
        this._dependencyResolver.put('controller', new Descriptor('service-microfrontends', 'controller', 'default', '*', '*'));
        this._factories.add(new MicrofrontendsServiceFactory());
    }
}

export const handler = new MicrofrontendsLambdaFunction().getHandler();