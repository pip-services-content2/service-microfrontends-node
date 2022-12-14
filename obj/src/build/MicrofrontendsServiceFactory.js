"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const MicrofrontendsMongoDbPersistence_1 = require("../persistence/MicrofrontendsMongoDbPersistence");
const MicrofrontendsFilePersistence_1 = require("../persistence/MicrofrontendsFilePersistence");
const MicrofrontendsMemoryPersistence_1 = require("../persistence/MicrofrontendsMemoryPersistence");
const MicrofrontendsController_1 = require("../logic/MicrofrontendsController");
const MicrofrontendsHttpServiceV1_1 = require("../services/version1/MicrofrontendsHttpServiceV1");
const MicrofrontendsCommandableGrpcServiceV1_1 = require("../services/version1/MicrofrontendsCommandableGrpcServiceV1");
const MicrofrontendsGrpcServiceV1_1 = require("../services/version1/MicrofrontendsGrpcServiceV1");
class MicrofrontendsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(MicrofrontendsServiceFactory.MemoryPersistenceDescriptor, MicrofrontendsMemoryPersistence_1.MicrofrontendsMemoryPersistence);
        this.registerAsType(MicrofrontendsServiceFactory.FilePersistenceDescriptor, MicrofrontendsFilePersistence_1.MicrofrontendsFilePersistence);
        this.registerAsType(MicrofrontendsServiceFactory.MongoDbPersistenceDescriptor, MicrofrontendsMongoDbPersistence_1.MicrofrontendsMongoDbPersistence);
        this.registerAsType(MicrofrontendsServiceFactory.ControllerDescriptor, MicrofrontendsController_1.MicrofrontendsController);
        this.registerAsType(MicrofrontendsServiceFactory.HttpServiceDescriptor, MicrofrontendsHttpServiceV1_1.MicrofrontendsHttpServiceV1);
        this.registerAsType(MicrofrontendsServiceFactory.CommandableGrpcServiceDescriptor, MicrofrontendsCommandableGrpcServiceV1_1.MicrofrontendsCommandableGrpcServiceV1);
        this.registerAsType(MicrofrontendsServiceFactory.GrpcServiceDescriptor, MicrofrontendsGrpcServiceV1_1.MicrofrontendsGrpcServiceV1);
    }
}
exports.MicrofrontendsServiceFactory = MicrofrontendsServiceFactory;
MicrofrontendsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "factory", "default", "default", "1.0");
MicrofrontendsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "persistence", "memory", "*", "1.0");
MicrofrontendsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "persistence", "file", "*", "1.0");
MicrofrontendsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "persistence", "mongodb", "*", "1.0");
MicrofrontendsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "controller", "default", "*", "1.0");
MicrofrontendsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "service", "http", "*", "1.0");
MicrofrontendsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "service", "commandable-grpc", "*", "1.0");
MicrofrontendsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "service", "grpc", "*", "1.0");
//# sourceMappingURL=MicrofrontendsServiceFactory.js.map