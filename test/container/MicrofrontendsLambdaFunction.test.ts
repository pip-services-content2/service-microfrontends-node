let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { MicrofrontendV1 } from '../../src/data/version1/MicrofrontendV1';
import { MicrofrontendsLambdaFunction } from '../../src/container/MicrofrontendsLambdaFunction';

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

suite('MicrofrontendsLambdaFunction', ()=> {
    let lambda: MicrofrontendsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-microfrontends:persistence:memory:default:1.0',
            'controller.descriptor', 'service-microfrontends:controller:default:default:1.0'
        );

        lambda = new MicrofrontendsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        var microfrontend1, microfrontend2: MicrofrontendV1;
        // Create one microfrontend
        let microfrontend = await lambda.act(
            {
                role: 'microfrontends',
                cmd: 'create_microfrontend',
                microfrontend: MICROFRONTEND1
            }
        );

        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, MICROFRONTEND1.name);
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
        microfrontend = await lambda.act(
            {
                role: 'microfrontends',
                cmd: 'create_microfrontend',
                microfrontend: MICROFRONTEND2
            }
        );

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
        let page = await lambda.act(
            {
                role: 'microfrontends',
                cmd: 'get_microfrontends'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the microfrontend
        microfrontend1.name = 'Updated Name 1';

        microfrontend = await lambda.act(
            {
                role: 'microfrontends',
                cmd: 'update_microfrontend',
                microfrontend: microfrontend1
            }
        );

        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, 'Updated Name 1');
        assert.equal(microfrontend.id, MICROFRONTEND1.id);

        microfrontend1 = microfrontend;

        // Delete microfrontend
        await lambda.act(
            {
                role: 'microfrontends',
                cmd: 'delete_microfrontend_by_id',
                microfrontend_id: microfrontend1.id
            }
        );

        // Try to get delete microfrontend
        microfrontend = await lambda.act(
            {
                role: 'microfrontends',
                cmd: 'get_microfrontend_by_id',
                microfrontend_id: microfrontend1.id
            }
        );

        assert.isNull(microfrontend || null);
    });
});