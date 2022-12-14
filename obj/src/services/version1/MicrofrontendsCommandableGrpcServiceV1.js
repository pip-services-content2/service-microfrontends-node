"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class MicrofrontendsCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/microfrontends');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-microfrontends', 'controller', 'default', '*', '*'));
    }
}
exports.MicrofrontendsCommandableGrpcServiceV1 = MicrofrontendsCommandableGrpcServiceV1;
//# sourceMappingURL=MicrofrontendsCommandableGrpcServiceV1.js.map