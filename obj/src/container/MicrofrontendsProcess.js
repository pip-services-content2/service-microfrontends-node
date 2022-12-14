"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const MicrofrontendsServiceFactory_1 = require("../build/MicrofrontendsServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class MicrofrontendsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("microfrontends", "Microfrontends microservice");
        this._factories.add(new MicrofrontendsServiceFactory_1.MicrofrontendsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.MicrofrontendsProcess = MicrofrontendsProcess;
//# sourceMappingURL=MicrofrontendsProcess.js.map