let assert = require('chai').assert;
let grpc = require('grpc');
let protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { MicrofrontendV1 } from '../../../src/data/version1/MicrofrontendV1';
import { MicrofrontendsMemoryPersistence } from '../../../src/persistence/MicrofrontendsMemoryPersistence';
import { MicrofrontendsController } from '../../../src/logic/MicrofrontendsController';
import { MicrofrontendsCommandableGrpcServiceV1 } from '../../../src/services/version1/MicrofrontendsCommandableGrpcServiceV1';

let grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let MICROFRONTEND1: MicrofrontendV1 = {
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
let MICROFRONTEND2: MicrofrontendV1 = {
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

suite('MicrofrontendsCommandableGrpcServiceV1', ()=> {
    let service: MicrofrontendsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new MicrofrontendsMemoryPersistence();
        let controller = new MicrofrontendsController();

        service = new MicrofrontendsCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-microfrontends', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-microfrontends', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-microfrontends', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        let microfrontend1, microfrontend2;

        // Create one microfrontend
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/microfrontends.create_microfrontend',
                    args_empty: false,
                    args_json: JSON.stringify({
                        microfrontend: MICROFRONTEND1
                    })
                },
                (err, response) => {
                    if (err == null) resolve(response);
                    else reject(err);
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
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/microfrontends.create_microfrontend',
                    args_empty: false,
                    args_json: JSON.stringify({
                        microfrontend: MICROFRONTEND2
                    })
                },
                (err, response) => {
                    if (err == null) resolve(response);
                    else reject(err);
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
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/microfrontends.get_microfrontends',
                    args_empty: false,
                    args_json: JSON.stringify({})
                },
                (err, response) => {
                    if (err == null) resolve(response);
                    else reject(err);
                });
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the microfrontend
        microfrontend1.name = 'Updated Name 1';

        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/microfrontends.update_microfrontend',
                    args_empty: false,
                    args_json: JSON.stringify({
                        microfrontend: microfrontend1
                    })
                },
                (err, response) => {
                    if (err == null) resolve(response);
                    else reject(err);
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
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/microfrontends.delete_microfrontend_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        microfrontend_id: microfrontend1.id
                    })
                },
                (err, response) => {
                    if (err == null) resolve(response);
                    else reject(err);
                });
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        microfrontend = JSON.parse(response.result_json);

        //assert.isNull(result);

        // Try to get delete microfrontend
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/microfrontends.get_microfrontend_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        microfrontend_id: microfrontend1.id
                    })
                },
                (err, response) => {
                    if (err == null) resolve(response);
                    else reject(err);
                });
        });

        assert.isTrue(response.result_empty);

        //assert.isNull(result);
    });
    
});
