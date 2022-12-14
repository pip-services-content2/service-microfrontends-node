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
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const MicrofrontendsLambdaFunction_1 = require("../../src/container/MicrofrontendsLambdaFunction");
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
suite('MicrofrontendsLambdaFunction', () => {
    let lambda;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let config = pip_services3_commons_nodex_1.ConfigParams.fromTuples('logger.descriptor', 'pip-services:logger:console:default:1.0', 'persistence.descriptor', 'service-microfrontends:persistence:memory:default:1.0', 'controller.descriptor', 'service-microfrontends:controller:default:default:1.0');
        lambda = new MicrofrontendsLambdaFunction_1.MicrofrontendsLambdaFunction();
        lambda.configure(config);
        yield lambda.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield lambda.close(null);
    }));
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        var microfrontend1, microfrontend2;
        // Create one microfrontend
        let microfrontend = yield lambda.act({
            role: 'microfrontends',
            cmd: 'create_microfrontend',
            microfrontend: MICROFRONTEND1
        });
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
        microfrontend = yield lambda.act({
            role: 'microfrontends',
            cmd: 'create_microfrontend',
            microfrontend: MICROFRONTEND2
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
        let page = yield lambda.act({
            role: 'microfrontends',
            cmd: 'get_microfrontends'
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        // Update the microfrontend
        microfrontend1.name = 'Updated Name 1';
        microfrontend = yield lambda.act({
            role: 'microfrontends',
            cmd: 'update_microfrontend',
            microfrontend: microfrontend1
        });
        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, 'Updated Name 1');
        assert.equal(microfrontend.id, MICROFRONTEND1.id);
        microfrontend1 = microfrontend;
        // Delete microfrontend
        yield lambda.act({
            role: 'microfrontends',
            cmd: 'delete_microfrontend_by_id',
            microfrontend_id: microfrontend1.id
        });
        // Try to get delete microfrontend
        microfrontend = yield lambda.act({
            role: 'microfrontends',
            cmd: 'get_microfrontend_by_id',
            microfrontend_id: microfrontend1.id
        });
        assert.isNull(microfrontend || null);
    }));
});
//# sourceMappingURL=MicrofrontendsLambdaFunction.test.js.map