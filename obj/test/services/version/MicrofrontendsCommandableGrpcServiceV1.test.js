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
let assert = require('chai').assert;
let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const MicrofrontendsMemoryPersistence_1 = require("../../../src/persistence/MicrofrontendsMemoryPersistence");
const MicrofrontendsController_1 = require("../../../src/logic/MicrofrontendsController");
const MicrofrontendsCommandableGrpcServiceV1_1 = require("../../../src/services/version1/MicrofrontendsCommandableGrpcServiceV1");
let grpcConfig = pip_services3_commons_nodex_2.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
let MICROFRONTEND1 = {
    id: "1",
    name: "Microfrontend 1",
    description: "Main module",
    path_prefix: "md1",
    icon: "icon1",
    type: "vue",
    remote_entry: "/remote",
    exposed_module: "module1",
    element_name: "main_module",
    params: {}
};
let MICROFRONTEND2 = {
    id: '2',
    name: "Microfrontend 2",
    description: "Second module",
    path_prefix: "md2",
    icon: "icon2",
    type: "vue",
    remote_entry: "/remote",
    exposed_module: "module2",
    element_name: "second_module",
    params: {}
};
suite('MicrofrontendsCommandableGrpcServiceV1', () => {
    let service;
    let client;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let persistence = new MicrofrontendsMemoryPersistence_1.MicrofrontendsMemoryPersistence();
        let controller = new MicrofrontendsController_1.MicrofrontendsController();
        service = new MicrofrontendsCommandableGrpcServiceV1_1.MicrofrontendsCommandableGrpcServiceV1();
        service.configure(grpcConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_1.Descriptor('service-microfrontends', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_1.Descriptor('service-microfrontends', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_1.Descriptor('service-microfrontends', 'service', 'grpc', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
    }));
    setup(() => {
        let packageDefinition = protoLoader.loadSync(__dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto", {
            keepCase: true,
            longs: Number,
            enums: Number,
            defaults: true,
            oneofs: true
        });
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;
        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        let microfrontend1, microfrontend2;
        // Create one microfrontend
        let response = yield new Promise((resolve, reject) => {
            client.invoke({
                method: 'v1/microfrontends.create_microfrontend',
                args_empty: false,
                args_json: JSON.stringify({
                    microfrontend: MICROFRONTEND1
                })
            }, (err, response) => {
                if (err == null)
                    resolve(response);
                else
                    reject(err);
            });
        });
        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let microfrontend = JSON.parse(response.result_json);
        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, MICROFRONTEND1.name);
        assert.equal(microfrontend.description, MICROFRONTEND1.description);
        assert.equal(microfrontend.path_prefix, MICROFRONTEND1.path_prefix);
        assert.equal(microfrontend.icon, MICROFRONTEND1.icon);
        assert.equal(microfrontend.type, MICROFRONTEND1.type);
        assert.equal(microfrontend.remote_entry, MICROFRONTEND1.remote_entry);
        assert.equal(microfrontend.exposed_module, MICROFRONTEND1.exposed_module);
        assert.equal(microfrontend.element_name, MICROFRONTEND1.element_name);
        microfrontend1 = microfrontend;
        // Create another microfrontend
        response = yield new Promise((resolve, reject) => {
            client.invoke({
                method: 'v1/microfrontends.create_microfrontend',
                args_empty: false,
                args_json: JSON.stringify({
                    microfrontend: MICROFRONTEND2
                })
            }, (err, response) => {
                if (err == null)
                    resolve(response);
                else
                    reject(err);
            });
        });
        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        microfrontend = JSON.parse(response.result_json);
        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, MICROFRONTEND2.name);
        assert.equal(microfrontend.description, MICROFRONTEND2.description);
        assert.equal(microfrontend.path_prefix, MICROFRONTEND2.path_prefix);
        assert.equal(microfrontend.icon, MICROFRONTEND2.icon);
        assert.equal(microfrontend.type, MICROFRONTEND2.type);
        assert.equal(microfrontend.remote_entry, MICROFRONTEND2.remote_entry);
        assert.equal(microfrontend.exposed_module, MICROFRONTEND2.exposed_module);
        assert.equal(microfrontend.element_name, MICROFRONTEND2.element_name);
        microfrontend2 = microfrontend;
        // Get all microfrontends
        response = yield new Promise((resolve, reject) => {
            client.invoke({
                method: 'v1/microfrontends.get_microfrontends',
                args_empty: false,
                args_json: JSON.stringify({})
            }, (err, response) => {
                if (err == null)
                    resolve(response);
                else
                    reject(err);
            });
        });
        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        // Update the microfrontend
        microfrontend1.name = 'Updated Name 1';
        response = yield new Promise((resolve, reject) => {
            client.invoke({
                method: 'v1/microfrontends.update_microfrontend',
                args_empty: false,
                args_json: JSON.stringify({
                    microfrontend: microfrontend1
                })
            }, (err, response) => {
                if (err == null)
                    resolve(response);
                else
                    reject(err);
            });
        });
        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        microfrontend = JSON.parse(response.result_json);
        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, 'Updated Name 1');
        assert.equal(microfrontend.id, MICROFRONTEND1.id);
        microfrontend1 = microfrontend;
        // Delete microfrontend
        response = yield new Promise((resolve, reject) => {
            client.invoke({
                method: 'v1/microfrontends.delete_microfrontend_by_id',
                args_empty: false,
                args_json: JSON.stringify({
                    microfrontend_id: microfrontend1.id
                })
            }, (err, response) => {
                if (err == null)
                    resolve(response);
                else
                    reject(err);
            });
        });
        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        microfrontend = JSON.parse(response.result_json);
        //assert.isNull(result);
        // Try to get delete microfrontend
        response = yield new Promise((resolve, reject) => {
            client.invoke({
                method: 'v1/microfrontends.get_microfrontend_by_id',
                args_empty: false,
                args_json: JSON.stringify({
                    microfrontend_id: microfrontend1.id
                })
            }, (err, response) => {
                if (err == null)
                    resolve(response);
                else
                    reject(err);
            });
        });
        assert.isTrue(response.result_empty);
        //assert.isNull(result);
    }));
});
//# sourceMappingURL=MicrofrontendsCommandableGrpcServiceV1.test.js.map