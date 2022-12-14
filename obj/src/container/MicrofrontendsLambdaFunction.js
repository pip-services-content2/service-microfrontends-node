"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.MicrofrontendsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const MicrofrontendsServiceFactory_1 = require("../build/MicrofrontendsServiceFactory");
class MicrofrontendsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("microfrontends", "Microfrontends function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-microfrontends', 'controller', 'default', '*', '*'));
        this._factories.add(new MicrofrontendsServiceFactory_1.MicrofrontendsServiceFactory());
    }
}
exports.MicrofrontendsLambdaFunction = MicrofrontendsLambdaFunction;
exports.handler = new MicrofrontendsLambdaFunction().getHandler();
//# sourceMappingURL=MicrofrontendsLambdaFunction.js.map