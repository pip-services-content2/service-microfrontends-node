"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrofrontendsGrpcServiceV1 = void 0;
let services = require('../../../../src/protos/microfrontends_v1_grpc_pb');
let messages = require('../../../../src/protos/microfrontends_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const MicrofrontendsGrpcConverterV1_1 = require("./MicrofrontendsGrpcConverterV1");
class MicrofrontendsGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.MicrofrontendsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-microfrontends", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getMicrofrontends(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.MicrofrontendPageReply();
            try {
                let result = yield this._controller.getMicrofrontends(correlationId, filter, paging);
                let page = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromMicrofrontendPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getMicrofrontendById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let microfrontendId = call.request.getMicrofrontendId();
            let response = new messages.MicrofrontendObjectReply();
            try {
                let result = yield this._controller.getMicrofrontendById(correlationId, microfrontendId);
                let microfrontend = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
                response.setMicrofrontend(microfrontend);
            }
            catch (err) {
                let error = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    createMicrofrontend(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let microfrontend = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.toMicrofrontend(call.request.getMicrofrontend());
            let response = new messages.MicrofrontendObjectReply();
            try {
                let result = yield this._controller.createMicrofrontend(correlationId, microfrontend);
                let grpcMicrofrontend = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
                if (result)
                    response.setMicrofrontend(grpcMicrofrontend);
            }
            catch (err) {
                let error = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    updateMicrofrontend(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let microfrontend = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.toMicrofrontend(call.request.getMicrofrontend());
            let response = new messages.MicrofrontendObjectReply();
            try {
                let result = yield this._controller.updateMicrofrontend(correlationId, microfrontend);
                let grpcMicrofrontend = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
                if (result)
                    response.setMicrofrontend(grpcMicrofrontend);
            }
            catch (err) {
                let error = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deleteMicrofrontendById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let microfrontendId = call.request.getMicrofrontendId();
            let response = new messages.MicrofrontendObjectReply();
            try {
                let result = yield this._controller.deleteMicrofrontendById(correlationId, microfrontendId);
                let grpcMicrofrontend = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromMicrofrontend(result);
                if (result)
                    response.setMicrofrontend(grpcMicrofrontend);
            }
            catch (err) {
                let error = MicrofrontendsGrpcConverterV1_1.MicrofrontendsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_microfrontends', null, this.getMicrofrontends);
        this.registerMethod('get_microfrontend_by_id', null, this.getMicrofrontendById);
        this.registerMethod('create_microfrontend', null, this.createMicrofrontend);
        this.registerMethod('update_microfrontend', null, this.updateMicrofrontend);
        this.registerMethod('delete_microfrontend_by_id', null, this.deleteMicrofrontendById);
    }
}
exports.MicrofrontendsGrpcServiceV1 = MicrofrontendsGrpcServiceV1;
//# sourceMappingURL=MicrofrontendsGrpcServiceV1.js.map