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
let restify = require('restify');
let assert = require('chai').assert;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const MicrofrontendsMemoryPersistence_1 = require("../../../src/persistence/MicrofrontendsMemoryPersistence");
const MicrofrontendsController_1 = require("../../../src/logic/MicrofrontendsController");
const MicrofrontendsHttpServiceV1_1 = require("../../../src/services/version1/MicrofrontendsHttpServiceV1");
let httpConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples("connection.protocol", "http", "connection.host", "localhost", "connection.port", 3000);
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
suite('MicrofrontendsHttpServiceV1', () => {
    let service;
    let rest;
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        let persistence = new MicrofrontendsMemoryPersistence_1.MicrofrontendsMemoryPersistence();
        let controller = new MicrofrontendsController_1.MicrofrontendsController();
        service = new MicrofrontendsHttpServiceV1_1.MicrofrontendsHttpServiceV1();
        service.configure(httpConfig);
        let references = pip_services3_commons_nodex_3.References.fromTuples(new pip_services3_commons_nodex_2.Descriptor('service-microfrontends', 'persistence', 'memory', 'default', '1.0'), persistence, new pip_services3_commons_nodex_2.Descriptor('service-microfrontends', 'controller', 'default', 'default', '1.0'), controller, new pip_services3_commons_nodex_2.Descriptor('service-microfrontends', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        yield service.open(null);
    }));
    suiteTeardown(() => __awaiter(void 0, void 0, void 0, function* () {
        yield service.close(null);
    }));
    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    test('CRUD Operations', () => __awaiter(void 0, void 0, void 0, function* () {
        let microfrontend1, microfrontend2;
        // Create one microfrontend
        let microfrontend = yield new Promise((resolve, reject) => {
            rest.post('/v1/microfrontends/create_microfrontend', {
                microfrontend: MICROFRONTEND1
            }, (err, req, res, microfrontend) => {
                if (err == null)
                    resolve(microfrontend);
                else
                    reject(err);
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
        microfrontend = yield new Promise((resolve, reject) => {
            rest.post('/v1/microfrontends/create_microfrontend', {
                microfrontend: MICROFRONTEND2
            }, (err, req, res, microfrontend) => {
                if (err == null)
                    resolve(microfrontend);
                else
                    reject(err);
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
        let page = yield new Promise((resolve, reject) => {
            rest.post('/v1/microfrontends/get_microfrontends', {}, (err, req, res, page) => {
                if (err == null)
                    resolve(page);
                else
                    reject(err);
            });
        });
        assert.isObject(page);
        assert.lengthOf(page.data, 2);
        // Update the microfrontend
        microfrontend1.name = 'Updated Name 1';
        microfrontend = yield new Promise((resolve, reject) => {
            rest.post('/v1/microfrontends/update_microfrontend', {
                microfrontend: microfrontend1
            }, (err, req, res, microfrontend) => {
                if (err == null)
                    resolve(microfrontend);
                else
                    reject(err);
            });
        });
        assert.isObject(microfrontend);
        assert.equal(microfrontend.name, 'Updated Name 1');
        assert.equal(microfrontend.id, MICROFRONTEND1.id);
        microfrontend1 = microfrontend;
        // Delete microfrontend
        let result = yield new Promise((resolve, reject) => {
            rest.post('/v1/microfrontends/delete_microfrontend_by_id', {
                microfrontend_id: microfrontend1.id
            }, (err, req, res, microfrontend) => {
                if (err == null)
                    resolve(microfrontend);
                else
                    reject(err);
            });
        });
        //assert.isNull(result);
        // Try to get delete microfrontend
        result = yield new Promise((resolve, reject) => {
            rest.post('/v1/microfrontends/get_microfrontend_by_id', {
                microfrontend_id: microfrontend1.id
            }, (err, req, res, result) => {
                if (err == null)
                    resolve(result);
                else
                    reject(err);
            });
        });
        //assert.isNull(result);
    }));
});
//# sourceMappingURL=MicrofrontendsHttpServiceV1.test.js.map