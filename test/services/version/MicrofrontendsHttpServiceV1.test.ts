let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { MicrofrontendV1 } from '../../../src/data/version1/MicrofrontendV1';
import { MicrofrontendsMemoryPersistence } from '../../../src/persistence/MicrofrontendsMemoryPersistence';
import { MicrofrontendsController } from '../../../src/logic/MicrofrontendsController';
import { MicrofrontendsHttpServiceV1 } from '../../../src/services/version1/MicrofrontendsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
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

suite('MicrofrontendsHttpServiceV1', ()=> {    
    let service: MicrofrontendsHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new MicrofrontendsMemoryPersistence();
        let controller = new MicrofrontendsController();

        service = new MicrofrontendsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-microfrontends', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-microfrontends', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-microfrontends', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', async () => {
        let microfrontend1, microfrontend2;

        // Create one microfrontend
        let microfrontend = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/microfrontends/create_microfrontend',
                {
                    microfrontend: MICROFRONTEND1
                },
                (err, req, res, microfrontend) => {
                    if (err == null) resolve(microfrontend);
                    else reject(err);
                });
        });

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

        microfrontend = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/microfrontends/create_microfrontend',
                {
                    microfrontend: MICROFRONTEND2
                },
                (err, req, res, microfrontend) => {
                    if (err == null) resolve(microfrontend);
                    else reject(err);
                });
        });

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
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/microfrontends/get_microfrontends',
                {},
                (err, req, res, page) => {
                    if (err == null) resolve(page);
                    else reject(err);
                });
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the microfrontend
        microfrontend1.name = 'Updated Name 1';

        microfrontend = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/microfrontends/update_microfrontend',
                {
                    microfrontend: microfrontend1
                },
                (err, req, res, microfrontend) => {
                    if (err == null) resolve(microfrontend);
                    else reject(err);
                });
        });

        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, 'Updated Name 1');
        assert.equal(microfrontend.id, MICROFRONTEND1.id);

        microfrontend1 = microfrontend;

        // Delete microfrontend
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/microfrontends/delete_microfrontend_by_id',
                {
                    microfrontend_id: microfrontend1.id
                },
                (err, req, res, microfrontend) => {
                    if (err == null) resolve(microfrontend);
                    else reject(err);
                });
        });

        //assert.isNull(result);

        // Try to get delete microfrontend
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/microfrontends/get_microfrontend_by_id',
                {
                    microfrontend_id: microfrontend1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                });
        });

        //assert.isNull(result);
    });
});